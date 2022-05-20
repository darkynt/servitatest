const testJsonData = `{"resourceType": "Organization", "id": "N81082", "meta": {"lastUpdated": "2021-03-24T00:00:00+00:00", "profile": "https://fhir.nhs.uk/STU3/StructureDefinition/ODSAPI-Organization-1"}, "extension": [{"url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-ODSAPI-ActivePeriod-1", "valuePeriod": {"extension": [{"url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-ODSAPI-DateType-1", "valueString": "Operational"}], "start": "1974-04-01"}}, {"url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-ODSAPI-OrganizationRole-1", "extension": [{"url": "role", "valueCoding": {"system": "https://directory.spineservices.nhs.uk/STU3/CodeSystem/ODSAPI-OrganizationRole-1", "code": "177", "display": "PRESCRIBING COST CENTRE"}}, {"url": "primaryRole", "valueBoolean": true}, {"url": "activePeriod", "valuePeriod": {"extension": [{"url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-ODSAPI-DateType-1", "valueString": "Operational"}], "start": "1974-04-01"}}, {"url": "status", "valueString": "Active"}]}, {"url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-ODSAPI-OrganizationRole-1", "extension": [{"url": "role", "valueCoding": {"system": "https://directory.spineservices.nhs.uk/STU3/CodeSystem/ODSAPI-OrganizationRole-1", "code": "76", "display": "GP PRACTICE"}}, {"url": "primaryRole", "valueBoolean": false}, {"url": "activePeriod", "valuePeriod": {"extension": [{"url": "https://fhir.nhs.uk/STU3/StructureDefinition/Extension-ODSAPI-DateType-1", "valueString": "Operational"}], "start": "2014-04-15"}}, {"url": "status", "valueString": "Active"}]}], "identifier": {"system": "https://fhir.nhs.uk/Id/ods-organization-code", "value": "N81082"}, "active": true, "type": {"coding": {"system": "https://fhir.nhs.uk/STU3/CodeSystem/ODSAPI-OrganizationRecordClass-1", "code": "1", "display": "HSCOrg"}}, "name": "CITY WALLS MEDICAL CENTRE", "telecom": [{"system": "phone", "value": "01244 357800"}], "address": {"line": ["ST. MARTINS WAY"], "city": "CHESTER", "district": "CHESHIRE", "postalCode": "CH1 2NR", "country": "ENGLAND"}}`
const testData = JSON.parse(testJsonData)
import {flattenedExtensionsArray} from './lib'

describe('the input parser', () => {
  it('Flattens extensions out from the initial array', () => {
    const result = flattenedExtensionsArray(testData.extension)
    console.log('result', JSON.stringify(result), result.length)
    expect(result instanceof Array).toBe(true)
  })
  it('Takes an extension object and finds the minimum Start Date', () => {

  })
})