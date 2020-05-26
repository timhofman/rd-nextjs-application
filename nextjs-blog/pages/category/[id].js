import Head from 'next/head'

import Layout from '../../components/layout'
import { request } from 'graphql-request';
import CATEGORY_QUERY from './category.query';
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
    const test = await getAllCategoryPaths()
    const paths = [
        {
            params: {
                id: 'test'
            },
        }
    ];
    return {
        paths,
        fallback: false
    }
}

export async function getAllCategoryPaths() {
    const queryResult = await (await apolloClient()).query({
        query: CATEGORY_QUERY
    });

    const paths = queryResult.data.categoryList.map((category) => category.url_key)
    return paths;
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