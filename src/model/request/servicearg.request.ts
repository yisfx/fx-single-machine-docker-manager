import { DockerImage } from "../container";

export interface ServiceArgRequest {
    Image: DockerImage
    portA: number,
    portB: number,
    volumeA: string,
    volumeB: string
    ContainerName: string,
}