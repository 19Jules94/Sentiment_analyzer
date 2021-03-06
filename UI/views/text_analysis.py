import streamlit as st

from annotated_text import annotated_text
# styles


# --------------------------------------------
def type_itext():

    st.title("Type a text to analyze:")
    __, __, __, __, __, __, __, col_button = st.beta_columns(8)
    with col_button:
        enviar = st.button('Send')
    texto_entrada = st.text_area(label="", value="", key="input", height=250)

    return texto_entrada


def option():

    tipo = st.beta_columns(4)
    racismo = tipo[0].checkbox('Racism', key="r")
    machism = tipo[1].checkbox('Sexism', key="m")
    bullying = tipo[2].checkbox('Bullying', key="b")
    analysis = tipo[3].button(label="Analysis")


def output_text(input_text):

    word = input_text.split(' ')
    p = ['negro', 'racismo']
    list_of_strings_ands_tuples = []
    for i in word:

        if(i in p):
            tuple1 = (i, "", "rgb(255, 228, 51)")
            list_of_strings_ands_tuples.append(tuple1)
            list_of_strings_ands_tuples.append(' ')
        else:
            list_of_strings_ands_tuples.append(i)
            print(list_of_strings_ands_tuples)
            list_of_strings_ands_tuples.append(' ')
    annotated_text(*list_of_strings_ands_tuples)


def write():
    input_t = type_itext()
    option()
    output_text(input_t)
