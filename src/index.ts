import * as grpc from "@grpc/grpc-js"
import _get from "lodash.get"
import _clone from "lodash.clone"

import health_messages from "./v1/health_pb"
import health_service from "./v1/health_grpc_pb"

export class Implementation {
    private statusMap: any
    constructor(statusMap: any) {
        this.statusMap = _clone(statusMap)
    }

    setStatus(service: string, status: any) {
        this.statusMap[service] = status
    }

    check(call: any, callback: (e: any, r?: any) => void) {
        let service = call.request.getService()
        let status = _get(this.statusMap, service, null)
        if (status === null) {
            // TODO(murgatroid99): Do this without an explicit reference to grpc.
            callback({ code: grpc.status.NOT_FOUND })
        } else {
            let response = new health_messages.HealthCheckResponse()
            response.setStatus(status)
            callback(null, response)
        }
    }
}

export const Client = health_service.HealthClient
export const messages = health_messages
export const service = health_service.HealthService
