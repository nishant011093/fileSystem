import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import withModal from '@Elements/Modal';
import { FILE, FOLDER } from '@Utils/constants';
import styled from 'styled-components';

const currentDate = () => {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

function FileInfo(_props) {
  const [type, handleType] = useState(FILE);
  return (
    <Container>
      <Top>
        <Toggle.Container>
          <Toggle.Option
            className={type === FILE ? 'selected' : ''}
            onClick={() => handleType(FILE)}
          >
            File
          </Toggle.Option>
          <Toggle.Option
            className={type === FOLDER ? 'selected' : ''}
            onClick={() => handleType(FOLDER)}
          >
            Folder
          </Toggle.Option>
        </Toggle.Container>
      </Top>

      <Formik
        initialValues={{
          type: 'file',
          name: '',
          creatorName: '',
          size: 0,
          date: currentDate()
        }}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = 'Name is Required';
          } else if (!values.creatorName) {
            errors.creatorName = 'Creator Name is Required';
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          _props.addEntry({
            ...values,
            type
          });
          _props.closeFn();
        }}
      >
        {props => (
          <Form.Container>
            <div className="formField">
              <Field
                placeholder="Name"
                onChange={props.handleChange}
                name="name"
                className="field"
                value={props.values.name}
                autocomplete="off"
              />
              {props.errors.name && props.touched.name ? (
                <Error>{props.errors.name}</Error>
              ) : (
                ''
              )}
            </div>

            <div className="formField">
              <Field
                placeholder="Creator"
                onChange={props.handleChange}
                name="creatorName"
                className="field"
                value={props.values.creatorName}
                autocomplete="off"
              />
              {props.errors.creatorName && props.touched.creatorName ? (
                <Error>{props.errors.creatorName}</Error>
              ) : (
                ''
              )}
            </div>

            <div className="formField">
              <Field
                placeholder="Size"
                type="number"
                onChange={props.handleChange}
                name="size"
                className="field"
                min="0"
                value={props.values.size}
              />
            </div>

            <div className="formField">
              <Field
                placeholder="date"
                type="date"
                onChange={props.handleChange}
                name="date"
                className="field"
                value={props.values.date}
              />
            </div>

            <Form.Submit
              type="submit"
              disabled={!props.dirty && !props.isSubmitting}
              className={
                !props.dirty && !props.isSubmitting > 0 ? 'disabled' : ''
              }
              onClick={props.handleSubmit}
            >
              Create
            </Form.Submit>
          </Form.Container>
        )}
      </Formik>
    </Container>
  );
}

export default withModal(FileInfo)({});

const Container = styled.div``;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px 0 32px;
`;

const Toggle = {
  Container: styled.div`
    height: 32px;
    width: 128px;
    border: 1px solid #dde0e4;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    user-select: none;
  `,
  Option: styled.div`
    font-family: Lato, sans-serif;
    font-size: 14px;
    color: #535b62;
    width: 50%;
    cursor: pointer;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    letter-spacing: 0;
    &.selected {
      background: #4ab7ff;
      color: white;
    }
  `
};

const Form = {
  Container: styled.div`
    padding: 1px 48px;
    & .formField {
      position: relative;
      & .field {
        width: 100%;
        background: #ffffff;
        border: 1px solid #dde0e4;
        border-radius: 8px;
        font-family: Lato, sans-serif;
        font-size: 14px;
        padding: 10px;
        position: relative;
        margin-bottom: 20px;
        &::placeholder {
          color: #afb2b6;
        }
        &[type='date']::placeholder {
          color: #afb2b6;
        }
      }
    }
  `,
  Submit: styled.div`
    background: #4ab7ff;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    justify-content: center;
    font-family: Lato, sans-serif;
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 40px;
    transition: opacity 250ms ease-in;
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `
};

const Error = styled.div`
  color: red;
  position: absolute;
  top: 42px;
  left: 5px;
  font-size: 12px;
  font-family: Lato, sans-serif;
`;

