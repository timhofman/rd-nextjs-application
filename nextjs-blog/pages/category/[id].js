import Head from 'next/head'

import Layout from '../../components/layout'
import { request } from 'graphql-request';
import CATEGORY_QUERY from '../../lib/category.query';
import apolloClient from '../../lib/apollo-client';

import utilStyles from '../../styles/utils.module.css'
import {useQuery} from "@apollo/react-hooks";


export default function Category({ categoryData }) {
    return (
        <Layout>
        <Head>
        <title>{categoryData.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{categoryData.title}</h1>
        <div className={utilStyles.lightText}>
    </div>
    <div dangerouslySetInnerHTML={{ __html: categoryData.description }} />
    </article>
    </Layout>
)
}

export async function getStaticPaths() {
    const paths = await getAllCategoryPaths()
    return {
        paths,
        fallback: false
    }
}

export async function getAllCategoryPaths() {
    const queryResult = await (await apolloClient()).query({
        query: CATEGORY_QUERY
    });
    
    return queryResult.data.categoryList.map(category => {
        return {
            params: {
                id: category.url_key
            }
        }
    })
}

export async function getStaticProps({ params }) {
    const categoryData = await getCategoryData(params.id)
    return {
        props: {
            categoryData
        }
    }
}

export async function getCategoryData(id) {

    return {
        id,
        title: 'test',
        description: 'blabla'
    }
}