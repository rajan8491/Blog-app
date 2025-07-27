import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name = {name || "content"}
        control = {control}
        render = {({field}) => (
            <Editor
            apiKey='4pt0fealfrf6medmm3tt6u8ax58gjddkqpkdffvvcjtef9ca'
            initialValue = {defaultValue}
            init = {{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                ],
                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help ",
                content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size: 14px }"
            }}
            onEditorChange={field.onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE

/*

Controller component used to connect {controlled components} to our form

controlled components -> controlled by react 

Controller is required instead of register() whenever our component  ->
1) not support ref
2) dont have implicit onChange, value
3) is a third party ui component

props ->
control - used to connect with useForm
render - render the controlled component {field argument is an object contain onChange, onBlur, ref, value, ...}

 */


/*

tinyMCE is rich text editor used to edit content in a way that resembles the final output

@tinymce/tinymce-react package wraps the TinyMCE editor as a react component (<Editor />)

init -> main config object includes plugins(functionalities) , toolbar(buttons that appear in editors top toolbar)

 */