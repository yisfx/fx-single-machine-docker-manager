import { DockerContainer, DockerImage } from "../../../model/container";

export interface ManageStore {
    container: DockerContainer[]
    images: DockerImage[]
}