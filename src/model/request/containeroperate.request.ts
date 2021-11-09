import { ContainerStatus } from "../container";

export interface OperateContainerRequest {
    Status: ContainerStatus
    ContainerName: string
}