import { useState } from "react";

import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  Banner,
} from "@shopify/polaris";

const BannerPage = () => {
  const [bannerHtml, setBannerHtml] = useState("");
  const [feedback, setFeedback] = useState(null);

  const submitBannerHtml = async () => {
    setFeedback(null); // Clear any existing feedback
    try {
      const response = await fetch("/api/update-theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ htmlToInject: bannerHtml }),
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback({
          status: "success",
          message: data.message || "HTML snippet added successfully!",
        });
      } else {
        // If the response is not OK, handle it accordingly
        console.error("Response not OK with status: ", response.status);
        setFeedback({
          status: "failure",
          message: `Failed to add the HTML snippet. Status code: ${response.status}`,
        });
      }
    } catch (error) {
      console.error("Request failed with error: ", error);
      setFeedback({ status: "failure", message: error.toString() });
    }
  };

  return (
    <Page title="Add Banner HTML">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextField
              label="Banner HTML"
              value={bannerHtml}
              onChange={(newValue) => setBannerHtml(newValue)}
              multiline={4}
              placeholder="<div>Your HTML content here</div>"
            />
            <Button primary onClick={submitBannerHtml}>
              Submit
            </Button>
            {feedback && (
              <Banner
                title={feedback.message}
                status={feedback.status === "success" ? "success" : "critical"}
              />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default BannerPage;
