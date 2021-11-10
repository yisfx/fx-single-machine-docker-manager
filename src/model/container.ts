export interface DockerContainer {
    ContainerID: string
    Image: string
    Command: string
    Created: string
    Status: string
    Port: string
    Name: string
}

export interface DockerImage {
    Repository: string
    Tag: string
    ImageID: string
    Created: string
    Size: string
}

export enum ContainerStatus {
    Run = "Run",
    Stop = "Stop",
    Delete = "Delete"

}