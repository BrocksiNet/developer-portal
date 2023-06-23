import fs from "fs-extra";
import {OpenAPIV3} from "openapi-types";
import OASNormalize from 'oas-normalize';

export const getStoplightUrls = async ({source, prefix}) => {
    const reduceUrls = (items, reduced = []) => items.reduce((reduced, item) => {
        item.slug && reduced.push(item.slug);
        item.items?.length && reduced.push(...reduceUrls(item.items))
        return reduced;
    }, reduced)

    const response = await fetch(source);
    const data = await response.json();
    return reduceUrls(data.items).map(slug => `${prefix}${slug}`);
}

class ReferenceToMarkdown {
    getResponse(response, offset = 0, lastDescription) {
        const prefix = '';//'&nbsp;'.repeat(offset);
        const props = [
            //    `<!-- getResponse: ${JSON.stringify(response, null, 2)} -->`
        ];

        if ('description' in response) {
            //props.push('<!-- getResponse description -->')
            props.push(`\n${response.description}`)
        }

        if ('content' in response) {
            for (const key of Object.keys(response.content)) {
                if ('example' in response.content[key]) {
                    if ('errors' in response.content[key].example) {
                        for (const error of response.content[key].example.errors) {
                            if ('title' in error) {
                                props.push(`\n${error.title}`)
                            }
                            if ('status' in error) {
                                props.push(`\n${error.status}`)
                            }
                            if ('description' in error) {
                                props.push(`\n${error.description}`)
                            }
                        }
                    }
                }
                if ('schema' in response.content[key]) {
                    props.push(...this.getSchema(response.content[key].schema), offset + 1, lastDescription);
                }
            }
        }

        return props;
    }

    getRef(ref, offset = 0, lastDescription = null) {
        const prefix = '';//'&nbsp;'.repeat(offset);
        const props = [
            //    `<!-- getRef: ${JSON.stringify(ref, null, 2)} -->`
        ];

        if (ref.startsWith('#/components/schemas/')) {
            const mySchema = this.cloneRef(ref);

            //props.push('<!-- getRef getSchema -->')
            props.push(...this.getSchema(mySchema, offset + 1, lastDescription));
        } else if (ref.startsWith('#/components/responses/')) {
            const myResponse = this.cloneRef(ref);

            //props.push('<!-- getRef getResponse -->')
            props.push(...this.getResponse(myResponse, offset + 1, lastDescription));
        } else {
            console.error('REF', ref);
        }

        return props;
    }

    cloneRef(name) {
        if (name.startsWith('#/components/schemas/')) {
            const parts = name.split('/');
            const sch = parts[3];
            return this.jsonReference.components.schemas[sch] ?? {};
        }

        if (name.startsWith('#/components/responses/')) {
            const parts = name.split('/');
            const sch = parts[3];
            return this.jsonReference.components.responses[sch] ?? {};
        }

        console.error('NO REF', name);
        return {};
    }

    refs = [];

    tryRef(structure) {
        if ('$ref' in structure) {
            if (this.refs.includes(structure['$ref'])) {
                return {};
            }

            // avoid recursion via refs
            this.refs.push(structure['$ref']);
            return this.cloneRef(structure['$ref']);
        }

        return structure;
    }

    getSchema(schema, offset = 0, lastDescription = null) {
        // fix max stack (loop reference)
        if (offset > 20) {
            return [];
        }

        schema = this.tryRef(schema);

        const prefix = '';//'&nbsp;'.repeat(offset);
        const props = [
            //    `<!-- getSchema: ${JSON.stringify(schema, null, 2)} -->`
        ];

        if ('description' in schema) {
            //if (schema.description !== lastDescription) {
            //props.push('<!-- getSchema description -->')
            props.push(`\n${prefix}${schema.description}`);
            //}
        }

        if ('properties' in schema) {
            for (const prop of Object.keys(schema.properties)) {
                const transfer = {name: prop};
                if ('type' in schema) {
                    transfer.type = schema.type;
                }
                //props.push('<!-- getSchema properties getParameter -->')
                props.push(...this.getParameter(schema.properties[prop], transfer, offset + 1, lastDescription))
            }
        }

        if ('additionalProperties' in schema && typeof schema.additionalProperties === 'object') {
            //props.push('<!-- getSchema additionalProperties -->')
            props.push(...this.getSchema(schema.additionalProperties, offset + 1, schema.description || lastDescription))
        }

        /*if ('items' in schema) {
            //props.push('<!-- getSchema items -->')
            props.push(...getSchema(schema['items'], offset + 1, schema.description || lastDescription));
        }*/

        if ('allOf' in schema) {
            //props.push('<!-- getSchema allOf -->')
            props.push(...this.getSchemas(schema['allOf'], offset + 1, schema.description || lastDescription));
        }

        if ('oneOf' in schema) {
            //props.push('<!-- getSchema oneOf -->')
            props.push(...this.getSchemas(schema['oneOf'], offset + 1, schema.description || lastDescription));
        }

        return props;
    }

    getSchemas(schemas, offset = 0, lastDescription = null) {
        // fix max stack (loop reference)
        if (offset > 20) {
            return [];
        }

        const props = [
            //    `<!-- getSchemas: ${JSON.stringify(schemas, null, 2)} -->`
        ];

        // "application\/vnd.api+json"
        for (const schema of schemas) {
            //props.push('<!-- getAllOff const of of allOf -->')
            props.push(...this.getSchema(schema, offset + 1, lastDescription));
        }

        return props;
    }

    getParameter(parameter, transfer = {}, offset = 0, lastDescription = null) {
        // fix max stack (loop reference)
        if (offset > 20) {
            return [];
        }

        parameter = this.tryRef(parameter);
        parameter = {
            ...parameter,
            ...transfer,
        };

        const prefix = '';//'&nbsp;'.repeat(offset);

        const props = [
            //    `<!-- getParameter ${parameter.name}: ${JSON.stringify(parameter, null, 2)} -->`
        ];

        const required = parameter?.required ? ' \*' : '';
        const def = parameter?.schema?.default
            ? ` = '${parameter.schema.default}'`
            : (
                parameter.allowEmptyValue ? ' = NULL' : ''
            );
        const type = parameter?.schema?.type
            ? `_${parameter.schema.type}_`
            : (
                parameter.type
                    ? `_${parameter.type}_`
                    : ''
            )

        //props.push('<!-- getParameter -->')
        props.push(`\n${prefix}**\`${parameter.name || name}\`** ${type}${required}${def}`);

        if (parameter?.schema?.pattern) {
            //props.push('<!-- getParameter pattern -->')
            props.push(`\n${prefix}_Match pattern: \`${parameter.schema.pattern}\`_`)
        }

        if (parameter?.schema?.enum) {
            //props.push('<!-- getParameter pattern -->')
            props.push(`\n${prefix}_Allowed values: \`${parameter.schema.enum.join(`\` | \``)}\`_`)
        }

        /*if ('description' in parameter) {
            //props.push('<!-- getParameter description -->')
            props.push(`\n${prefix}${parameter.description}`)
        }*/

        //props.push('<!-- getParameter getSchema -->')
        props.push(...this.getSchema(parameter, offset + 1, parameter.description || lastDescription))

        return props;
    }

    jsonReference: OpenAPIV3.Document;
    process({
                jsonReference,
                flatUrls,
                as,
                nodes,
                cleanup,
            }: {jsonReference: OpenAPIV3.Document, flatUrls: [], as: string, nodes: string, cleanup: boolean}) {
        this.jsonReference = jsonReference;
        const contents = {};
        for (const route of Object.keys(jsonReference.paths)) {
            for (const method of Object.keys(jsonReference.paths[route])) {
                console.log(`Transforming: ${method.toUpperCase()} ${route}`);

                // reset refs recursion
                this.refs = [];
                const content = [];
                const {summary, description, parameters, responses} = jsonReference.paths[route][method];

                // title and description
                content.push(`# ${summary}`);
                content.push(`\`${method.toUpperCase()} ${route}\``)
                content.push(`\n${description}`);

                content.push(`\n## Request`)
                // parameters
                if (parameters?.length) {
                    const queryParameters = parameters.filter((param) => param.in === 'query');
                    const pathParameters = parameters.filter((param) => param.in === 'path');
                    const headerParameters = parameters.filter((param) => param.in === 'header');

                    const buildParameters = (title, parameters) => {
                        if (!parameters.length) {
                            return;
                        }

                        content.push(`\n### ${title} Parameters`)

                        for (const parameter of parameters) {
                            content.push(...this.getParameter(parameter));
                        }
                    }

                    buildParameters('Header', headerParameters);
                    buildParameters('Path', pathParameters);
                    buildParameters('Query', queryParameters);
                }

                if (Object.keys(responses).length) {
                    content.push(`\n## Responses`)

                    for (const responseCode of Object.keys(responses)) {
                        const response = responses[responseCode];
                        const {content: responseContent, $ref} = response;

                        if ('description' in response) {
                            content.push(`${response.description}`)
                        }

                        content.push(`\n### ${responseCode}`);

                        if (responseContent) {
                            for (const responseStruct of Object.keys(responseContent)) {
                                // "application\/vnd.api+json" or "application\/json"
                                const schema = responseContent[responseStruct].schema;

                                //content.push('<!-- response responseContent -->')
                                content.push(`#### ${responseStruct}`)
                                content.push(...this.getSchema(schema))
                            }
                        }

                        if ($ref) {
                            //content.push('<!-- response $ref -->')
                            content.push(...this.getRef($ref))
                        }
                    }
                }

                // find key by summary
                const url = flatUrls.find(({title}) => title === summary);
                if (!url) {
                    console.log(`No URL found for ${summary}`)
                    continue;
                }
                contents[url.slug] = content.join("\n");
                //break;
            }
            //break;
        }

        const lastReverse = as.split('/').reverse();
        const lastDir = [...lastReverse].slice(1).reverse().join('/');
        const filePrefix = `${lastReverse[0]}##`; // admin-api-reference.html## -> must be transformed to #/ !!
        const dstDir = `./external/${lastDir}/`; // ./external/resources/api/

        // cleanup old build
        if (cleanup && fs.existsSync(dstDir)) {
            fs.rmSync(dstDir, {recursive: true, force: true});
        }

        // create dir for new build
        if (!fs.existsSync(dstDir)) {
            fs.mkdirSync(dstDir, {recursive: true});
        }

        // save files
        Object.keys(contents)
            .forEach(file => {
                console.log('writing', `${dstDir}${filePrefix}${file}.md`)
                fs.writeFileSync(`${dstDir}${filePrefix}${file}.md`, contents[file]);
            })

        return {contents};
    }
}

export const generateMarkdownFromStoplight = async ({
                                                        source,
                                                        nodes,
                                                        reference,
                                                        as
                                                    }: {
    source: string,
    nodes: string,
    reference: string,
    as: string
}, cleanup = true) => {
    const jsonReference = await (await fetch(reference)).json();
    const tableOfContents = await (await fetch(source)).json();

    const oas = new OASNormalize(jsonReference);

    oas
        .validate()
        .then(definition => {
            // Definition will always be JSON, and valid.
            console.log(definition);
        })
        .catch(err => {
            console.log(err);
        });

    oas
        .deref()
        .then(definition => {
            // Definition will always be JSON, and valid.
            // can we now dump separate paths combined with methods?
            // ideally: <SwagSchema path="/some/path" method="POST" />
            console.log(definition);
        })
        .catch(err => {
            console.log(err);
        });

    const reduceUrls = (items, reduced = []) => items.reduce((reduced, item) => {
        item.slug && reduced.push({slug: item.slug, title: item.title});
        item.items?.length && reduced.push(...reduceUrls(item.items))
        return reduced;
    }, reduced)

    const flatUrls = reduceUrls(tableOfContents.items);

    const formatter = new ReferenceToMarkdown();

    const {
        contents
    } = formatter.process({
        jsonReference,
        flatUrls,
        as,
        nodes,
        cleanup,
    });
}