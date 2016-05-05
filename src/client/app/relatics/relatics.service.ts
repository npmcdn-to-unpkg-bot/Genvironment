import {Injectable} from "@angular/core";

@Injectable()

export class RelaticsService {


    GetData(url:string, operationName:string, workspaceId:string, entryCode:string, objectId:string):Promise<HTMLDocument> {

        // xml data for the SOAP request
        let xml = `<soap:Envelope   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
            xmlns:xsd="http://www.w3.org/2001/XMLSchema"  
            xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> 
            <soap:Body> 
            <GetResult xmlns="http://www.relatics.com/"> 
            <Operation>${operationName}</Operation> 
            <Identification> 
            <Identification> 
            <Workspace>${workspaceId}</Workspace> 
            </Identification> 
            </Identification> 
            <Parameters> 
            <Parameters> 
            <Parameter Name="parameter"  
            Value="${objectId}"/> 
            </Parameters> 
            </Parameters> 
            <Authentication> 
            <Authentication> 
            <Entrycode>${entryCode}</Entrycode> 
            </Authentication> 
            </Authentication> 
            </GetResult> 
            </soap:Body> 
            </soap:Envelope>`;


        // Define a SOAP request for relatics endpoint
        let SoapRequest= new XMLHttpRequest();

        // Send xml data to endpoint
        SoapRequest.open('POST', url, false);
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
                reject('webservice could not be reached or wrong parameters have been')
            }

        });
    }


}