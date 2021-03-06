const defaultEndpoints = [
    {
        id: 'operation',
        address: 'operation.api.cloud.yandex.net:443',
    },
    {
        id: 'compute',
        address: 'compute.api.cloud.yandex.net:443',
    },
    {
        id: 'iam',
        address: 'iam.api.cloud.yandex.net:443',
    },
    {
        id: 'resourcemanager',
        address: 'resource-manager.api.cloud.yandex.net:443',
    },
    {
        id: 'resource-manager',
        address: 'resource-manager.api.cloud.yandex.net:443',
    },
    {
        id: 'mdb-clickhouse',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'managed-clickhouse',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'mdb-mongodb',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'managed-mongodb',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'mdb-postgresql',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'managed-postgresql',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'mdb-redis',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'managed-redis',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'mdb-mysql',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'managed-mysql',
        address: 'mdb.api.cloud.yandex.net:443',
    },
    {
        id: 'dataproc',
        address: 'dataproc.api.cloud.yandex.net:443',
    },
    {
        id: 'vpc',
        address: 'vpc.api.cloud.yandex.net:443',
    },
    {
        id: 'container-registry',
        address: 'container-registry.api.cloud.yandex.net:443',
    },
    {
        id: 'load-balancer',
        address: 'load-balancer.api.cloud.yandex.net:443',
    },
    {
        id: 'serverless-functions',
        address: 'serverless-functions.api.cloud.yandex.net:443',
    },
    {
        id: 'serverless-triggers',
        address: 'serverless-triggers.api.cloud.yandex.net:443',
    },
    {
        id: 'k8s',
        address: 'mks.api.cloud.yandex.net:443',
    },
    {
        id: 'managed-kubernetes',
        address: 'mks.api.cloud.yandex.net:443',
    },
    {
        id: 'logs',
        address: 'logs.api.cloud.yandex.net:443',
    },
    {
        id: 'ydb',
        address: 'ydb.api.cloud.yandex.net:443',
    },
    {
        id: 'iot-devices',
        address: 'iot-devices.api.cloud.yandex.net:443',
    },
    {
        id: 'iot-data',
        address: 'iot-data.api.cloud.yandex.net:443',
    },
    {
        id: 'dataproc-manager',
        address: 'dataproc-manager.api.cloud.yandex.net:443',
    },
    {
        id: 'kms',
        address: 'kms.api.cloud.yandex.net:443',
    },
    {
        id: 'kms-crypt',
        address: 'kms.yandex:443',
    },
    {
        id: 'endpoint',
        address: 'api.cloud.yandex.net:443',
    },
    {
        id: 'storage',
        address: 'storage.yandexcloud.net:443',
    },
    {
        id: 'serialssh',
        address: 'serialssh.cloud.yandex.net:9600',
    },
    {
        id: 'ai-translate',
        address: 'translate.api.cloud.yandex.net:443',
    },
    {
        id: 'ai-vision',
        address: 'vision.api.cloud.yandex.net:443',
    },
    {
        id: 'locator',
        address: 'locator.api.cloud.yandex.net:443',
    },
    {
        id: 'ai-stt',
        address: 'transcribe.api.cloud.yandex.net:443',
    },
    {
        id: 'ai-speechkit',
        address: 'transcribe.api.cloud.yandex.net:443',
    },
];

const grpc = require('grpc');
const util = require('./util');
const grpcEndpoint = require('../api/endpoint');

function zipEndpoints(ep) {
    let result = {};
    for (let e of ep) {
        result[e.id] = e.address;
    }
    return result;
}

class EndpointResolver {
    constructor() {
        this.__endpoints = zipEndpoints(defaultEndpoints);
    }

    async updateEndpointList(cloudApiEndpoint) {
        const ctor = grpcEndpoint.ApiEndpointService.makeGrpcConstructor();
        let epService = new ctor(
            cloudApiEndpoint,
            grpc.credentials.createSsl()
        );
        epService = util.pimpServiceInstance(epService);
        const result = await epService.list({});
        this.__endpoints = zipEndpoints(result.endpoints);
    }

    resolve(endpointId) {
        if (!this.__endpoints.hasOwnProperty(endpointId)) {
            throw new Error(`unknown endpoint '${endpointId}'`);
        }

        return this.__endpoints[endpointId];
    }
}

module.exports = { EndpointResolver };
