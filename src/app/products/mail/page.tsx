import { cookies } from "next/headers"
import Image from "next/image"

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Mail } from "@/app/products/mail/components/mail"
import { accounts, mails } from "@/app/products/mail/data"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import getProviders from "@/app/actions/getProviders"

interface Account {
  label: string;
  email: string;
  icon: React.ReactNode;
}
async function fetchAndFormatAccounts(): Promise<Account[]> {
  console.log("Request time:", new Date().toLocaleTimeString());
  const response = await getProviders();
  let formattedAccounts: Account[] = []; // Explicitly type formattedAccounts as an array of Account

  // console.log(response);
  console.log(response.payload.length);
  if (response.type === 'GET_PROVIDERS_SUCCESS' && Array.isArray(response.payload)) {
    formattedAccounts = response.payload.map(provider => ({
      label: provider.title, // Ensure this matches the actual provider object structure
      email: provider.code, // Ensure this matches the actual provider object structure
      icon: (
        <svg fill="#000000" width="89px" height="89px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128 209c-44.735 0-81-36.265-81-81s36.265-81 81-81 81 36.265 81 81-36.265 81-81 81zm.5-33c26.51 0 48-21.49 48-48s-21.49-48-48-48-48 21.49-48 48 21.49 48 48 48z" fill-rule="evenodd"></path> </g></svg>
      ),
    }));
  }

  return formattedAccounts;
}

export default async function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout && layout.value !== "undefined" ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed && collapsed.value !== "undefined" ? JSON.parse(collapsed.value) : undefined;

  const accounts = await fetchAndFormatAccounts();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <ContentLayout title="Lineas">
        <div className="hidden flex-col md:flex">
          <Mail
            accounts={accounts}
            //mails={mails}
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          />
        </div>

      </ContentLayout>
    </>
  )
}

