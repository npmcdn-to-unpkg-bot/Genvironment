/**
 * Created by imambaks on 4-5-2016.
 */
import {Http, Headers, Request, RequestOptions} from 'angular2/http';
import {Injectable} from "angular2/core";

@Injectable()
export class PostService {

    constructor(private _http:Http) {

    }

    getPost() {

        let headers = new Headers({
            'access-control-request-method': 'GET'
        });

        let options = new RequestOptions({
            headers: headers
        });


        return this._http.get("http://localhost/quote", options)
            .map(res=>res.json())
    }
}