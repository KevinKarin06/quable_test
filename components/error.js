import { Button } from "@mui/material"

export default function Error(props) {
    return (
        <div className="center-horizontal">
            <h2>Something went wrong please try again later</h2>
            <Button onClick={() => { props.onRetryClicked() }}>Retry</Button>
        </div>
    )
}