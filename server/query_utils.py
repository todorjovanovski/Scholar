import os
from dotenv import load_dotenv, find_dotenv
from pinecone import Pinecone
from langchain_core.prompts import ChatPromptTemplate
from pinecone_utils import get_vector_store
from langchain_openai import ChatOpenAI
load_dotenv(find_dotenv(), override=True)

pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
index = pc.Index("scholar_attachments", "https://scholar-attachments-7dn089x.svc.aped-4627-b74a.pinecone.io")

def get_similarity_by_query(query, chat_id, k=3):
    vector_store = get_vector_store()
    result = vector_store.similarity_search(query, k=k, filter={"file-id": chat_id})
    return result

def get_prompt_template():
    qa_prompt = f"""Based on the context below, answer only the question asked.
        If you can't find the answer in the provided context, politely ask the user to ask questions only about the uplaoded file, 
        except when the user is thanking you. Give the answer in the same language as the question.\n\nContext: {{context}}"""
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", qa_prompt),
            ("human", "{input}"),
        ]
    )
    return prompt

def get_generated_text(query, chat_id, k=5):
    llm = ChatOpenAI(model_name="gpt-4o-mini", temperature=0.3)
    prompt = get_prompt_template()
    qa_chain = prompt | llm
    similarities = get_similarity_by_query(query, chat_id, k)
    context = "\n".join([similarity.page_content for similarity in similarities])
    answer = qa_chain.invoke({"context": context, "input": query})
    return answer.content
