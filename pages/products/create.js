import { Alert, Backdrop, Box, Button, Card, CardContent, CircularProgress, Snackbar, TextField } from "@mui/material";
import { useRef, useState } from "react";
import axios from 'axios'


export default function CreateProductPage(props) {

    const [loading, setLoading] = useState(false)
    const [snack, showSnack] = useState(null)
    const [open, setOpen] = useState(false);

    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const vendorRef = useRef(null)
    const typeRef = useRef(null)
    const tagRef = useRef(null)
    const fileRef = useRef(null)

    const validate = (field) => {
        return field != undefined && field != "";
    }

    const clearForm = () => {
        titleRef.current.value = ""
        descriptionRef.current.value = ""
        typeRef.current.value = ""
        tagRef.current.value = ""
        vendorRef.current.value = ""
    }

    function handleClick(e) {
        e.preventDefault()
        const data = {
            title: titleRef.current.value,
            body_html: descriptionRef.current.value,
            product_type: typeRef.current.value,
            tags: tagRef.current.value.split(","),
            vendor: vendorRef.current.value,
            // file: fileRef.current.files[0] ?? null,
        }
        if (validate(data.title) && validate(data.body_html) && validate(data.product_type)
            && validate(tagRef.current.value) && validate(data.vendor)) {
            setLoading(true)
            showSnack(null)
            axios.post(`${window.location.origin}/api/products`, { product: data }).then(resp => {
                const data = resp.data
                if (data.error) {
                    showSnack({ type: 'error', msg: 'Something went wrong,try again later', open: true })
                } else {
                    clearForm()
                    showSnack({ type: 'success', msg: 'Product added', open: true })
                }
            }).finally(() => setLoading(false))
        } else {
            showSnack({ type: 'error', msg: 'please fill all inputs', open: true })
        }
        console.log(data);
    }

    function handleBackDropClose() { }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        showSnack(null)
    };

    return (
        <div className="createPage">
            <Snackbar open={snack} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <Alert onClose={handleClose} severity={(snack != null) ? snack.type : ''} sx={{ width: '100%' }}>
                    {(snack != null) && snack.msg}
                </Alert>
            </Snackbar>
            <div>
                <Card sx={{ minWidth: 275, maxWidth: '80%', margin: '0 auto' }}>
                    <CardContent>
                        <form action="" method="post">
                            <h2>Add Product</h2>
                            <div className='formControl'>
                                <div>
                                    <label htmlFor="title">Title<span>*</span></label>
                                    <input required type="text" ref={titleRef} name="title" id="title" />
                                </div>

                                <div>
                                    <label htmlFor="vendor">Vendor<span>*</span></label>
                                    <input required type="text" ref={vendorRef} name="vendor" id="vendor" />
                                </div>
                            </div>
                            <div className='formControl'>
                                <div>
                                    <label htmlFor="type">Type<span>*</span></label>
                                    <input required type="text" ref={typeRef} name="type" id="type" />
                                </div>
                                <div>
                                    <label htmlFor="tag">Tags<span> (seperate tags by comma(,))</span></label>
                                    <input required type="text" ref={tagRef} name="tag" id="tag" placeholder="tag1,tag2,tag3" />
                                </div>
                            </div>
                            <label htmlFor="description">Description<span>*</span></label>
                            <textarea name="description" ref={descriptionRef}></textarea>
                            <div className='formControl' style={{ marginTop: '10px' }}>
                                {/* <div className='fileWrapper'>
                                    <span>Joindre un fichier</span>
                                    <input type="file" ref={fileRef} />
                                </div> */}
                                <Box sx={{ '& button': { m: 1 } }}>
                                    <Button variant="contained" size="large" onClick={handleClick}>Save</Button>
                                </Box>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleBackDropClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}