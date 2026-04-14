import { CMSAdapter } from "./interface";
import { MockCMSAdapter } from "./adapters/mock";
import { StrapiCMSAdapter } from "./adapters/strapi";

/**
 * CMS Factory — returns the appropriate adapter based on environment config.
 *
 * Set `USE_STRAPI=true` in `.env.local` to switch from mock data to your
 * live Strapi instance. Requires `STRAPI_API_URL` and `STRAPI_READ_ONLY_TOKEN`.
 */
function createCMSAdapter(): CMSAdapter {
    if (process.env.USE_STRAPI === "true") {
        return new StrapiCMSAdapter();
    }
    return new MockCMSAdapter();
}

export const cms = createCMSAdapter();
