import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { AlertMessageIF } from '@/interfaces'
import { FilingCodes } from '@/enums'

/**
 * Mixin for components to retrieve text/settings from JSON resource.
 */
@Component({
  computed: {
    ...mapState(['configObject', 'isBComp'])
  }
})

export default class ResourceLookupMixin extends Vue {
    readonly configObject!: any
    readonly isBComp!: boolean

    /**
     * Returns certify message using the configuration lookup object.
     * @param entity the entity type of the component
     * @returns the appropriate message for the certify component for the current filing flow
     */
    certifyText (feeCode: string): string {
      if (this.configObject && this.configObject.flows) {
        const flow = this.configObject.flows.find(x => x.feeCode === feeCode)
        if (flow && flow.certifyText) {
          return flow.certifyText
        }
      }
      return ''
    }

    /**
     * Returns the current entity's full display name.
     * @returns the entity display name (if the configuration has been loaded)
     */
    displayName (): string {
      return this.configObject?.displayName || ''
    }

    /**
     * Validates directors on edit/cease and return any warning messages.
     * @returns the compliance message or null (if the configuration has been loaded)
     */
    directorWarning (directors: Array<any>): AlertMessageIF {
      const filingCode = this.isBComp ? FilingCodes.DIRECTOR_CHANGE_BC : FilingCodes.DIRECTOR_CHANGE_OT
      // FUTURE: Too much code for this. Can be condensed and made more reusable.
      if (directors && directors.length) {
        const configSection = this.configObject.flows.find(x => x.feeCode === filingCode).warnings
        let errors = []
        // If this entity has a BC Residency requirement for directors, one of the
        // directors specified needs to have both their mailing and delivery address within British Columbia
        if (configSection.bcResident) {
          if (directors.filter(x => (x.deliveryAddress.addressRegion !== 'BC' ||
                                    (x.mailingAddress &&
                                     x.mailingAddress.addressRegion !== 'BC'))).length === directors.length) {
            // If no directors reside in BC, retrieve the appropriate alert message
            errors.push({ 'title': configSection.bcResident.title, 'msg': configSection.bcResident.message })
          }
        }
        // If this entity has a Canadian Residency requirement for directors, the majority
        // of directors need to have both their mailing and delivery address within Canada
        if (configSection.canadianResident) {
          const count = directors.length
          const notCanadian = directors.filter(x => (x.deliveryAddress.addressCountry !== 'CA' ||
                                                    (x.mailingAddress &&
                                                     x.mailingAddress.addressCountry !== 'CA'))).length
          // If the majority of the directors do not reside in Canada, retrieve the appropriate alert message
          if (notCanadian / count > 0.5) {
            errors.push({ 'title': configSection.canadianResident.title,
              'msg': configSection.canadianResident.message })
          }
        }
        // Check if this entity has the minimum number of directors
        if (configSection.minDirectors) {
          const min = configSection.minDirectors.count
          if (directors.filter(x => x.actions.indexOf('ceased') < 0).length < min) {
            errors.push({ 'title': configSection.minDirectors.title, 'msg': configSection.minDirectors.message })
          }
        }

        if (errors.length > 0) {
          return errors[0]
        }
      }
      return null
    }
}
