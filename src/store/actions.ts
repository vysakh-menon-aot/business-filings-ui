import { EntityStatus, EntityTypes, FilingStatus } from '@/enums'
import { FilingDataIF } from '@/interfaces'

export default {
  setKeycloakRoles ({ commit }, keycloakRoles: Array<string>) {
    commit('keycloakRoles', keycloakRoles)
  },
  setAuthRoles ({ commit }, authRoles: Array<string>) {
    commit('authRoles', authRoles)
  },
  setCurrentDate ({ commit }, currentDate: string) {
    commit('currentDate', currentDate)
  },
  setLastAgmDate ({ commit }, lastAgmDate: string) {
    commit('lastAgmDate', lastAgmDate)
  },
  setNextARDate ({ commit }, nextARDate: string) {
    commit('nextARDate', nextARDate)
  },
  setNameRequest ({ commit }, nameRequest: object) {
    commit('nameRequest', nameRequest)
  },
  setARFilingYear ({ commit }, ARFilingYear: number) {
    commit('ARFilingYear', ARFilingYear)
  },
  setEntityBusinessNo ({ commit }, entityBusinessNo: string) {
    commit('entityBusinessNo', entityBusinessNo)
  },
  setEntityName ({ commit }, entityName: string) {
    commit('entityName', entityName)
  },
  setEntityType ({ commit }, entityType: EntityTypes) {
    commit('entityType', entityType)
  },
  setEntityStatus ({ commit }, entityStatus: EntityStatus) {
    commit('entityStatus', entityStatus)
  },
  setEntityIncNo ({ commit }, entityIncNo: string) {
    commit('entityIncNo', entityIncNo)
  },
  setEntityFoundingDate ({ commit }, entityFoundingDate: string) {
    commit('entityFoundingDate', entityFoundingDate)
  },
  setBusinessEmail ({ commit }, businessEmail: string) {
    commit('businessEmail', businessEmail)
  },
  setBusinessPhone ({ commit }, businessPhone: string) {
    commit('businessPhone', businessPhone)
  },
  setBusinessPhoneExtension ({ commit }, businessPhoneExtension: string) {
    commit('businessPhoneExtension', businessPhoneExtension)
  },
  setLastPreLoadFilingDate ({ commit }, lastPreLoadFilingDate: string) {
    commit('lastPreLoadFilingDate', lastPreLoadFilingDate)
  },
  setCurrentFilingStatus ({ commit }, currentFilingStatus: FilingStatus) {
    commit('currentFilingStatus', currentFilingStatus)
  },
  setTasks ({ commit }, tasks: Array<object>) {
    commit('tasks', tasks)
  },
  setFilings ({ commit }, filings: Array<object>) {
    commit('filings', filings)
  },
  setRegisteredAddress ({ commit }, registeredAddress: object) {
    commit('registeredAddress', registeredAddress)
  },
  setRecordsAddress ({ commit }, recordsAddress: object) {
    commit('recordsAddress', recordsAddress)
  },
  setDirectors ({ commit }, directors: Array<object>) {
    commit('directors', directors)
  },
  setLastAnnualReportDate ({ commit }, lastAnnualReportDate: string) {
    commit('lastAnnualReportDate', lastAnnualReportDate)
  },
  setConfigObject ({ commit }, configObject: object) {
    commit('configObject', configObject)
  },
  setFilingData ({ commit }, filingData: Array<FilingDataIF>) {
    commit('filingData', filingData)
  }
}
