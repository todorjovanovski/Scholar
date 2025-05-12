import os
from dotenv import load_dotenv, find_dotenv
from pinecone import Pinecone
from langchain import PromptTemplate
from langchain.chains import LLMChain
from pinecone_utils import get_vector_store
from model_utils import get_llm_model
load_dotenv(find_dotenv(), override=True)

pc = Pinecone(
        api_key=os.environ.get("PINECONE_API_KEY")
    )
index = pc.Index("scholar_attachments")

def get_similarity_by_query(query, chat_id, k=3):
    vector_store = get_vector_store()
    result = vector_store.similarity_search(query, k=k, filter={"chat-id": chat_id})
    return result

def get_prompt_template():
    prompt = PromptTemplate(
        template=f"""Based on the context below, answer only the question asked.
        If you can't find the answer in the context, say that you don't have any knowledge:\n\nContext: {{context}}\n\nQuestion: {{question}}""",
        input_variables=["context", "question"],
    )
    return prompt

def get_generated_text(query, chat_id, k=3):
    llm = get_llm_model()
    prompt = get_prompt_template()
    qa_chain = LLMChain(prompt=prompt, llm=llm)
    similarities = get_similarity_by_query(query, chat_id, k)
    context = "\n".join([similarity.page_content for similarity in similarities])
    answer = qa_chain.run({"context": context, "question": query})
    return answer
