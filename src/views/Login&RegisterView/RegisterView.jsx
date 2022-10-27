import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/authOperations';
import style from './loginStyle.module.css';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import { FaSpinner } from 'react-icons/fa';

const initialValues = { name: '', email: '', password: '' };

const validationSchema = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email format').required('Required'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
      'Password can only contain Latin letters.'
    )
    .required('No password provided'),
});

export default function LoginView() {
  const dispatch = useDispatch();
  const isError = useSelector(state => state.auth.isError);
  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);

    try {
      await dispatch(authOperations.register(values));
    } catch (e) {
      console.log(e);
      console.log('catch');
    } finally {
      console.log('finally');
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={style.loginForm}>
          <p className={style.header}>Registration</p>

          <div className={style['form-control']}>
            <label htmlFor="name" className={style.label}>
              Name
            </label>
            <Field
              className={[
                style.field,
                errors.name && touched.name
                  ? style.errorField
                  : style.normalField,
              ].join(' ')}
              id="name"
              name="name"
              placeholder="name"
            />
            <div className={style.error}>
              {touched.name ? errors.name : null}
            </div>
          </div>

          <div className={style['form-control']}>
            <label htmlFor="email" className={style.label}>
              Email
            </label>
            <Field
              className={[
                style.field,
                errors.email && touched.email
                  ? style.errorField
                  : style.normalField,
              ].join(' ')}
              id="email"
              name="email"
              placeholder="email"
            />
            <div className={style.error}>
              {touched.email ? errors.email : null}
            </div>
          </div>

          <div className={style['form-control']}>
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <Field
              className={[
                style.field,
                errors.password && touched.password
                  ? style.errorField
                  : style.normalField,
              ].join(' ')}
              id="password"
              type="password"
              name="password"
              placeholder="password"
            />

            <div className={style.error}>
              {touched.password ? errors.password : null}
            </div>
          </div>

          <button
            type="submit"
            className={style.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <FaSpinner
                icon="fa-solid fa-spinner"
                className={style.spinner}
                size="1.5rem"
              />
            ) : (
              <span>Submit</span>
            )}
          </button>
          <div className={style.errorMsg}>{isError}</div>
        </Form>
      )}
    </Formik>
  );
}
