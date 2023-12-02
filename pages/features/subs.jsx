// pages/features/subs.jsx
import { Card, Page, Layout, BlockStack } from "@shopify/polaris";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "@/components/hooks/useFetch";

const SubscriptionsFeature = () => {
  const router = useRouter();
  const fetch = useFetch();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  async function checkSubscriptionStatus() {
    const res = await fetch("/api/apps/debug/getActiveSubscriptions");
    const data = await res.json();
    const activeSubscriptions =
      data.body.data.appInstallation.activeSubscriptions;

    // Assume only one subscription is relevant for this example
    if (activeSubscriptions.length > 0) {
      setSubscriptionStatus(activeSubscriptions[0].status);
    }
  }

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  return (
    <Page
      title="Subscription Features"
      backAction={{ content: "Home", onAction: () => router.push("/debug") }}
    >
      <Layout>
        <Layout.Section>
          {subscriptionStatus === "ACTIVE" ? (
            <Card title="Active Subscription Features" sectioned>
              <BlockStack>
                <p>You have access to all the features of the app!</p>
              </BlockStack>
            </Card>
          ) : (
            <Card title="Subscription Required" sectioned>
              <BlockStack>
                <p>You need an active subscription to access these features.</p>
              </BlockStack>
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SubscriptionsFeature;
