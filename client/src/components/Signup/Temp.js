import React , {useState} from 'react'
import {Typography , StylesProvider, withStyles , Button , Paper, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, } from 'formik';
import * as Yup from 'yup'
import FormTextField from '../sub-components/TextFieldHelper'
import SelectHelper from '../sub-components/SelectHelper'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Alert from '../sub-components/Alert'
import store from '../../store/store'
import * as actions from '../../store/actionTypes'
import {useLayoutEffect} from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginLeft: '20px',
      marginRight: '20px',
    },
    paper: {
      padding: theme.spacing(2),
    //   textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    education:{
        
    },
    types:{
        marginTop: '20px',
        color: 'black',
    }

  }));


const RegisterStyle = withStyles({

    "MuiTypography-body1":{
        marginTop: '80px',
        fontSize: '70px'
    }


})(()=> null)



    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email("Enter a valid Email address")
        .required("Email address is required"),

        password: Yup.string()
        .min(6, "Password Should be atleast 6 char long")
        .required("Password is required"),

        passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password is not same'),

        privilage: Yup.string()
        .ensure()
        .required("Privilage is required"),

        age: Yup.number()
        .required('This is required'),

        aadharNo: Yup.number()
        .required('This is required'),

        name: Yup.string()
        .required(3,'Name Should be atleast 6 char long'),

        sex: Yup.string()
        .ensure()
        .required("Sex is required"),

        HospitalName: Yup.string()
        .required(3,'Hospital Name Should be atleast 6 char long'),

        address: Yup.string()
        .required(3,'Address Should be atleast 6 char long'),

    })


function Register() {

    const [isNext, setIsNext] = useState(false)
    const [state, setstate] = useState({})
    let history = useHistory();
    const classes = useStyles();
    const [isLoading,setLoading] = useState(false) 
    const [error,setError] = useState('')

    useLayoutEffect(() => {
        store.dispatch({type: actions.APPBAR_TITLE , payload: 'SignUp'})
    }, [])


    const handleNext = () =>{

        setIsNext(true)

    }

    return (
        <StylesProvider>
            <RegisterStyle />
            {isNext?
                state.userType === 'Patient' ?
                <div>
                <Formik 
                initialValues={{email: '' , password: "" , passwordConfirmation: '' , privilage: '' ,aadharNo: 0 , age: 0, sex: '' , address: '' , HospitalName: ''}}
                validationSchema={validationSchema}
                onSubmit={(values  , {setSubmitting })=> {
                    console.log('submit req send')
                    setLoading(true)
                            axios({
                                method: 'post',
                                url: 'localhost:4000/signup',
                                headers: {}, 
                                data: {
                                username: state.email,
                                password: state.password,
                                userType: state.userType,
                                PatientName: values.name,
                                AadharNo: values.aadharNo,
                                sex: values.sex,
                                age: values.age,
                                }
                            })
                            .then((res) =>{
                                
                                if(res.data.id ){
                                    history.push('/login')
                                }
                                else{
                                    setError(res.data)
                                }
                            })
                            .catch(err => {
                                console.log('err in the req' , err)
                            })
                        
                }}
                >
                    {({ isSubmitting }) => (
                    <Form>
                        <div className={classes.root}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                {error !== '' ? <Alert severity="error" alertText={error} />: null}
                                <Typography style={{fontSize: '30px'}}>Personal Details</Typography>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="name" label="Name" placeholder="Email Address" type="email" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="aadharNo" label="Aadhar No." placeholder="Aadhar No." type="number" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="age" label="Age" placeholder="Age" type="number" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <SelectHelper name='sex' label="Select Gender"  options={['Male' , 'Female']} />     
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <Button type="submit" disabled={isSubmitting} variant="contained" type='submit' color="primary" style={{width: '300px'}}>
                                    {isLoading?  "Loading..." : "Next"}
                                    </Button>
                                </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        </div>
                    </Form>
                )}
                </Formik>    
                </div>
                :
                <div>
                <Formik 
                initialValues={{email: '' , password: "" , passwordConfirmation: '' , privilage: '' ,aadharNo: 0 , age: 0, sex: '' , address: '' , HospitalName: ''}}
                validationSchema={validationSchema}
                onSubmit={(values  , {setSubmitting })=> {
                    console.log('submit req send')
                    setLoading(true)
                            axios({
                                method: 'post',
                                url: 'localhost:4000/signup',
                                headers: {}, 
                                data: {
                                username: state.email,
                                password: state.password,
                                userType: state.userType,
                                HospitalName: values.HospitalName,
                                address: values.address
                                }
                            })
                            .then((res) =>{
                                
                                if(res.data.id ){
                                    history.push('/login')
                                }
                                else{
                                    setError(res.data)
                                }
                            })
                            .catch(err => {
                                console.log('err in the req' , err)
                            })     
                    setLoading(false)
                    setSubmitting(false)
                    
                }}
                >
                    {({ isSubmitting }) => (
                    <Form>
                        <div className={classes.root}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                {error !== '' ? <Alert severity="error" alertText={error} />: null}
                                <Typography style={{fontSize: '30px'}}>Hospital Details</Typography>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="HospitalName" label="Hospital Name" placeholder="Hospital Name" type="text" />
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <FormTextField name="address" label="Address" placeholder="Address" type="text" />
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <Button  disabled={isSubmitting} variant="contained" type='submit' color="primary" style={{width: '300px'}}>
                                    {isLoading?  "Loading..." : "Submit"}
                                    </Button>
                                </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        </div>
                    </Form>
                )}
                </Formik>    
                </div>
            :
            <div>
            <Formik 
            initialValues={{email: '' , password: "" , passwordConfirmation: '' , privilage: '' ,aadharNo: 0 , age: 0, sex: '' , address: '' , HospitalName: ''}}
            validationSchema={validationSchema}
            onSubmit={(values  , {setSubmitting })=> {
                console.log('submit req send')
                setLoading(true)
                if(isNext){
                    if (state.userType === 'Patient'){
                        axios({
                            method: 'post',
                            url: 'http://localhost:4000/signup',
                            headers: {}, 
                            data: {
                              username: state.email,
                              password: state.password,
                              userType: state.userType,
                              PatientName: values.name,
                              AadharNo: values.aadharNo,
                              sex: values.sex,
                              age: values.age,
                            }
                          })
                          .then((res) =>{
                              
                              if(res.data.id ){
                                history.push('/login')
                              }
                              else{
                                setError(res.data)
                              }
                          })
                          .catch(err => {
                              console.log('err in the req' , err)
                          })
                    }else{
                        axios({
                            method: 'post',
                            url: 'http://localhost:4000/signup',
                            headers: {}, 
                            data: {
                              username: state.email,
                              password: state.password,
                              userType: state.userType,
                              HospitalName: values.HospitalName,
                              address: values.address
                            }
                          })
                          .then((res) =>{
                              
                              if(res.data.id ){
                                history.push('/login')
                              }
                              else{
                                setError(res.data)
                              }
                          })
                          .catch(err => {
                              console.log('err in the req' , err)
                          })
                    }
                    
                }else{
                    setstate({userType: values.privilage,
                            username: values.email,
                            password: values.password})

                       setIsNext(true)     
                }
                
                  
                  setLoading(false)
                  setSubmitting(false)
                
            }}
            >
                {({ isSubmitting }) => (
                <Form>
                    <div className={classes.root}>
                    <Grid container spacing={5}>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                            {error !== '' ? <Alert severity="error" alertText={error} />: null}
                            <Typography style={{fontSize: '30px'}}>SignUp</Typography>
                            <div style={{marginTop: '10px'}}>
                                <FormTextField name="email" label="Email" placeholder="Email Address" type="email" />
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <FormTextField name="password" label="Password" placeholder="Password" type="password" />
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <FormTextField name="passwordConfirmation" label="Confirm Password" placeholder="Confirm Password" type="password" />
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <SelectHelper name='privilage' label="Select Role"  options={['Patient' , 'Hospital']} />     
                            </div>
                            <div style={{marginTop: '20px'}}>
                                <Button type="submit" disabled={isSubmitting} variant="contained"  color="primary" style={{width: '300px'}}>
                                {isLoading?  "Loading..." : "Next"}
                                </Button>
                            </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    </div>
                </Form>
            )}
            </Formik>    
            </div>
            }
            
        </StylesProvider> 
        
    )
}

export default Register





