import * as grpc from "@grpc/grpc-js"
import type { ServerErrorResponse, ServerStatusResponse } from "@grpc/grpc-js/build/src/server-call"
import _get from "lodash.get"
import _clone from "lodash.clone"

import * as health_messages from "./v1/health_pb"
import * as health_service from "./v1/health_grpc_pb"

const healthMessages = health_messages as any

export class Implementation implements grpc.UntypedServiceImplementation {
    [name: string]: any

    private statusMap: any
    constructor(statusMap: any) {
        this.statusMap = _clone(statusMap)
    }

    setStatus(service: string, status: any) {
        this.statusMap[service] = status
    }

    // type HandleCall<RequestType, ResponseType> = handleUnaryCall<RequestType, ResponseType> | handleClientStreamingCall<RequestType, ResponseType> | handleServerStreamingCall<RequestType, ResponseType> | handleBidiStreamingCall<RequestType, ResponseType>;
    // type handleUnaryCall<RequestType, ResponseType> = (call: ServerUnaryCall<RequestType, ResponseType>, callback: sendUnaryData<ResponseType>) => void;
    check(
        call: grpc.ServerUnaryCall<any, any>,
        callback: (
            error: ServerErrorResponse | ServerStatusResponse | null,
            value?: any | null,
            trailer?: grpc.Metadata,
            flags?: number
        ) => void
    ) {
        let service = call.request.getService()
        let status = _get(this.statusMap, service, null)
        if (status === null) {
            // TODO(murgatroid99): Do this without an explicit reference to grpc.
            callback({ code: grpc.status.NOT_FOUND })
        } else {
            let response = new healthMessages.HealthCheckResponse()
            response.setStatus(status)
            callback(null, response)
        }
    }
}

export const Client = health_service.HealthClient
export const messages = health_messages
export const service = health_service.HealthService
