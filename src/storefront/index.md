---
items:
  - text: Getting started
    link: /frontends/
  - text: Capabilities & Limitations
    link: /frontends/why-shopware-frontends.html
  - text: Areas
    items:
      - text: Framework
        collapsed: true
        items:
          - text: Requirements
            link: /frontends/framework/requirements.html   
          - text: Internal Structure
            link: /frontends/framework/internal-structure.html
          - text: Shopping Experiences
            link: /frontends/framework/shopping-experiences.html
          - text: Styling
            link: /frontends/framework/styling.html   
          - text: Context Composables
            link: /frontends/framework/context-composables.html
          - text: Shared Composables
            link: /frontends/framework/shared-composables.html
          - text: Images
            link: /frontends/framework/images.html  
          - text: Associations
            link: /frontends/framework/associations.html
          - text: Storefront url
            link: /frontends/framework/storefront-url.html
      - text: Building
        collapsed: true
        items:
          - text: Setup Templates
            link: /frontends/getting-started/templates.html 
          - text: Routing
            link: /frontends/getting-started/routing.html
          - text: CMS
            link: /frontends/getting-started/cms/
          - text: E-commerce
            link: /frontends/getting-started/e-commerce/ 
          - text: Page elements
            link: /frontends/getting-started/page-elements/
          - text: Overwriting and estensing Composables
            link: /frontends/getting-started/overwriting-composables.html
          - text: Sitemap
            link: /frontends/getting-started/sitemap.html
          - text: Wishlist
            link: /frontends/getting-started/wishlist.html
      - text: Best Practices
        collapsed: true
        items:
          - text: Deployment
            link: /frontends/best-practices/deployment.html 
          - text: Error-handling
            link: /frontends/best-practices/error-handling.html
          - text: Images
            link: /frontends/best-practices/images.html
          - text: Performance
            link: /frontends/best-practices/performance.html
          - text: Testing
            link: /frontends/best-practices/testing.html
  - text: Package Reference
    items:
      - text: Composables
        link: /frontends/packages/composables.html
      - text: API client
        link: /frontends/packages/api-client.html
      - text: Types
        link: /frontends/packages/types.html
      - text: Helpers
        link: /frontends/packages/helpers.html
  - text: Resources
    items:
      - text: Examples
        link: /frontends/resources/examples/
      - text: Community modules
        link: /frontends/resources/community-modules/
aside: false
swag:
  related: false
---

<SwagLanding image="/landing/apps.png">
    <template #title>Shopware Frontends</template>
    <template #description>
        Shopware Composable Frontends is Shopware's toolkit for creating <b>platform agnostic</b> custom storefronts. The demo store implementation is based on <b>Vue.js</b> and <b>Nuxt3</b>.
    </template>
    <template #ctas>
        <PageRef page="/docs/guides/plugins/apps/app-base-guide.html" title="Start building your first Shopware Frontends project" sub="Learn how to set up your development environment and start coding within a couple of minutes." />
    </template>
    <template #exposed>
        <SwagLandingCardList>
            <template #title>Starter guides</template>
            <template #description>
                The number of topics that are available for exploration can be overwhelming. To help you navigate this complexity, we have curated tutorials that are designed to familiarize you with some of our core concepts.
            </template>
            <template #cards>
            <!--<SwagLandingCard page="https://github.com/shopware/app-php-sdk/blob/main/docs/01-getting_started.md">
                    <template #title>App SDK</template>
                    <template #sub>Tools and libraries that simplify the custom app development process for the Shopware platform.</template>
                </SwagLandingCard>-->
            <!--<SwagLandingCard page="/docs/guides/plugins/apps/local-development/app-development-with-platform-sh.html">
                    <template #title>Local app development</template>
                    <template #sub>Learn how to develop your app on Platform.sh or with Docker.</template>
                </SwagLandingCard>-->
               <SwagLandingCard page="/frontends/getting-started/templates.html">
                    <template #title>Setup templates</template>
                    <template #sub>Learn how to get started with custom frontend with pre-existing templates.</template>
                </SwagLandingCard>
            <SwagLandingCard page="/frontends/resources/examples/">
                    <template #title>Cookbook recepies</template>
                    <template #sub>Kickstart your frontends project with provided example codes.</template>
                </SwagLandingCard>
           <!--<SwagLandingCard page="/frontends/framework/internal-structure.html">
                    <template #title>Framework</template>
                    <template #sub>The internal structure of Shopware Frontends is designed to provide flexibility, reusability and abstraction.</template>
                </SwagLandingCard>-->
            <SwagLandingCard page="/frontends/getting-started/templates/demo-store-template.html">
                    <template #title>Vue Demo Store on StackBlitz</template>
                    <template #sub>The demo store template is a reference implementation of an online store UI.</template>
                </SwagLandingCard>
            </template>
        </SwagLandingCardList>
    </template>
    <!--<template #exposed2>
        <SwagLandingCardList>
            <template #title>Product areas</template>
            <template #description>
                If you prefer to dig into a specific topic directly, choose from one of the product areas. You can also find them on the left all the time.
            </template>
            <template #cards>
                <SwagLandingCard page="./cart/">
                    <template #title>Cart</template>
                    <template #sub>Modify the cart, add custom data or calculate taxes</template>
                </SwagLandingCard>
                <SwagLandingCard page="./checkout/">
                    <template #title>Checkout</template>
                    <template #sub>Apply discounts, price calculations or control shipping method availabilities</template>
                </SwagLandingCard>
                <SwagLandingCard page="./payment/">
                    <template #title>Payment</template>
                    <template #sub>Handle payments from different gateways or process refunds</template>
                </SwagLandingCard>
                <SwagLandingCard page="./storefront/">
                    <template #title>Storefront</template>
                    <template #sub>Build extensions or themes for the customer storefront using templates or custom styles</template>
                </SwagLandingCard>
                <SwagLandingCard page="./administration/">
                    <template #title>Administration</template>
                    <template #sub>Explore the possibilities of custom admin modules or extensions</template>
                </SwagLandingCard>
                <SwagLandingCard page="./content/">
                    <template #title>Content</template>
                    <template #sub>Build custom content elements or add custom fields to existing entities</template>
                </SwagLandingCard>
                <SwagLandingCard page="./flow-builder/">
                    <template #title>Flow Builder</template>
                    <template #sub>Add custom actions that for third party integrations or automate processes</template>
                </SwagLandingCard>
                <SwagLandingCard page="./products-and-catalog/">
                    <template #title>Products & Catalog</template>
                    <template #sub>Extend the product definition or add custom fields to the product</template>
                </SwagLandingCard>
                <SwagLandingCard page="./workflow/">
                    <template #title>Workflow</template>
                    <template #sub>Build custom states and transitions for orders or add custom fields to existing entities</template>
                </SwagLandingCard>
            </template>
        </SwagLandingCardList>
    </template>-->
    <!--<template #exposed3>
        <SwagLandingCardList>
            <template #title>Related topics</template>
            <template #cards>
                <SwagLandingCard page="/docs/guides/plugins/apps/local-development/app-development-with-platform-sh.html">
                    <template #title>Add apps locally</template>
                    <template #sub>Learn how to add app server to your local development setup on Platform.sh or with Docker.</template>
                </SwagLandingCard>
                <SwagLandingCard page="/docs/guides/plugins/apps/starter/starter-admin-extension.html">
                    <template #title>Shopware CLI</template>
                    <template #sub>Your tool when it comes to app development, installation, and deployments.</template>
                </SwagLandingCard>
            <SwagLandingCard page="/docs/guides/plugins/apps/hosting-guide/">
                    <template #title>Hosting guide</template>
                    <template #sub>Not all apps need hosting. Explore the server options.</template>
                </SwagLandingCard>
            <SwagLandingCard page="/docs/guides/plugins/apps/app-scripts/">
                    <template #title>App scripts</template>
                    <template #sub>Leverage app scripts to customize the checkout or fetch additional data in your Storefront.</template>
                </SwagLandingCard>
            <SwagLandingCard page="/docs/guides/plugins/apps/app-scripts/">
                    <template  #title>Customize templates</template>
                    <template #sub>Custom templates let you extend or modify the appearance of parts of your Storefront.</template>
                </SwagLandingCard>
                <SwagLandingCard page="/docs/guides/plugins/apps/starter/starter-admin-extension.html">
                    <template #title>Admin Extensions</template>
                    <template #sub>Build powerful modules for the admin panel using our new Admin Extension API.</template>
                </SwagLandingCard>
            </template>
        </SwagLandingCardList>
    </template>-->
</SwagLanding>
