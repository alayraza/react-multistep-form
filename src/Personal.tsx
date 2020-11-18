import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(5),
  },
}));

interface Props {
  handleNext: () => void;
}

const PersonalDetail: React.FC<Props> = ({ handleNext }) => {
  const [value, setValue] = React.useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", age: 0 }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        age: Yup.number()
          .min(18, "Age must be greater than or equal to 18")
          .max(60, "Age must be less than 60 or equal to 60"),
      })}
      onSubmit={(values) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));

          handleNext();
        }, 400);
      }}
    >
      {({ errors, touched, dirty, isValid }) => (
        <Form className={classes.root}>
          <Field
            as={TextField}
            variant="filled"
            label="First Name"
            name="firstName"
            type="text"
            style={{ width: '70vw' }}
            error={errors.firstName && touched.firstName}
            helperText={touched.firstName && errors.firstName}
          />
          <br />
          <br />
          <Field
            as={TextField}
            variant="filled"
            label="Last Name"
            name="lastName"
            type="text"
            style={{ width: '70vw' }}
            error={errors.lastName && touched.lastName}
            helperText={touched.lastName && errors.lastName}
          />
          <br />
          <br />
          <Field
            as={TextField}
            variant="filled"
            label="Age"
            name="age"
            type="number"
            style={{ width: '70vw' }}
            error={errors.age && touched.age}
            helperText={touched.age && errors.age}
          />
          <br />
          <br />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!dirty || !isValid}
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalDetail;
