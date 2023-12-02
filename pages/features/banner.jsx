import { useState } from "react";
import {
  Button,
  Card,
  Form,
  FormLayout,
  TextField,
  Page,
} from "@shopify/polaris";
import useFetch from "@/components/hooks/useFetch";

const BannerFeature = () => {
  const [htmlSnippet, setHtmlSnippet] = useState("");
  const fetch = useFetch();
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/update-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlSnippet }),
      });

      if (response.ok) {
        setStatus("Theme updated successfully");
      } else {
        setStatus("Failed to update theme");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error occurred while updating theme");
    }
  };

  return (
    <Page title="Banner Feature">
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              label="HTML Snippet"
              value={htmlSnippet}
              onChange={setHtmlSnippet}
              multiline={4}
            />
            <Button submit>Update Theme</Button>
          </FormLayout>
        </Form>
        {status && <p>{status}</p>}
      </Card>
    </Page>
  );
};

export default BannerFeature;
