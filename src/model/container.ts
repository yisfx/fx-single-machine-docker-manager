export interface Container {
    ContainerID: string
    Image: string
    Command: string
    Created: string
    Status: string
    Port: string
    Name: string
}

export interface Image {
    Repository: string
    Tag: string
    ImageID: string
    Created: string
    Size: string
}