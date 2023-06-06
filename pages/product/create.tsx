import { NextPage } from "next";
import { BaseLayout, ProductCreate } from "@/components/ui";
import { ChangeEvent, useState } from 'react';

const Create: NextPage = () => {
    return (
        <BaseLayout>
            <ProductCreate />
        </BaseLayout>
    )
}

export default Create;