import {Injectable} from 'angular2/core';


@Injectable()

export class RelaticsService {


    GetData(operationName:string, workspaceId:string, entryCode:string, objectId:string):Promise<HTMLDocument> {

        // xml Data for the SOAP request
        var xml = '<soap:Envelope ' + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<soap:Body>' +
            '<GetResult xmlns="http://www.relatics.com/">' +
            '<Operation>' + operationName + '</Operation>' +
            '<Identification>' +
            '<Identification>' +
            '<Workspace>' + workspaceId + '</Workspace>' +
            '</Identification>' +
            '</Identification>' +
            '<Parameters>' +
            '<Parameters>' +
            '<Parameter Name="parameter" ' +
            'Value="' +
            objectId
            + '"/>' +
            '</Parameters>' +
            '</Parameters>' +
            '<Authentication>' +
            '<Authentication>' +
            '<Entrycode>' + entryCode + '</Entrycode>' +
            '</Authentication>' +
            '</Authentication>' +
            '</GetResult>' +
            '</soap:Body>' +
            '</soap:Envelope>';


        // Send SOAP request (send xml data)
        let SoapRequest;
        let url = "https://arcadis.relaticsonline.com/DataExchange.asmx?wsdl";
        SoapRequest = new XMLHttpRequest();

        SoapRequest.open("POST", url, false);
        SoapRequest.setRequestHeader('Content-Type', 'text/xml; charset-utf-8');
        SoapRequest.send(xml);

        // Retrieve SOAP request
        let SoapResponse;
        let parser = new DOMParser();
        SoapResponse = parser.parseFromString(SoapRequest.responseText, 'text/xml');

        return new Promise<HTMLDocument>((resolve, reject) => {
            if (!SoapResponse.getElementsByTagName('Export')[0]) {
                resolve(SoapResponse)

            }
            else {
                reject("webservice couldn't be reached or is wrongly defined")
            }

        });
    }


}