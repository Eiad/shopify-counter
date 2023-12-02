import withMiddleware from "@/utils/middleware/withMiddleware.js";
import Shopify from "@shopify/shopify-api"; // Assuming Shopify API is used

/**
 * API handler to update the theme.liquid file of the current theme.
 *
 * @param {import("next").NextApiRequest} req - The HTTP request object.
 * @param {import("next").NextApiResponse} res - The HTTP response object.
 */
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Method not allowed" });
  }

  const { shop, accessToken } = req.session; // Assuming session contains these
  const htmlSnippet = req.body.htmlSnippet; // HTML snippet to be added

  try {
    const client = new Shopify.Clients.Rest(shop, accessToken);

    // Fetch the current theme ID
    const themes = await client.get({ path: "themes" });
    const mainTheme = themes.body.themes.find((theme) => theme.role === "main");
    if (!mainTheme) throw new Error("Main theme not found");

    // Fetch the theme.liquid file
    const themeLiquid = await client.get({
      path: `themes/${mainTheme.id}/assets`,
      query: { "asset[key]": "layout/theme.liquid" },
    });
    let themeLiquidContent = themeLiquid.body.asset.value;

    // Insert the HTML snippet before </body>
    themeLiquidContent = themeLiquidContent.replace(
      "</body>",
      `${htmlSnippet}</body>`
    );

    // Update the theme.liquid file
    await client.put({
      path: `themes/${mainTheme.id}/assets`,
      data: {
        asset: { key: "layout/theme.liquid", value: themeLiquidContent },
      },
    });

    res.status(200).send({ message: "Theme updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export default withMiddleware("verifyRequest")(handler);
