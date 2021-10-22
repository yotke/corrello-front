import { ReactComponent as LoaderSvg } from '../assets/img/loader.svg'

export function Loader() {
    return (
        <div className={"loader-screen"}>
            <LoaderSvg />
        </div>
    )
}