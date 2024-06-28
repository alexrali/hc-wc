import { cookies } from "next/headers"
import Image from "next/image"

import { Mail } from "@/app/products/mail/components/mail"
import { accounts, mails } from "@/app/products/mail/data"
import { ContentLayout } from "@/components/admin-panel/content-layout"

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout && layout.value !== "undefined" ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed && collapsed.value !== "undefined" ? JSON.parse(collapsed.value) : undefined;

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
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow w-[98%] mx-auto mt-4 mb-4">
        <div className="hidden flex-col md:flex">
          <Mail
            accounts={accounts}
            mails={mails}
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          />
        </div>
      </div>
      </ContentLayout>
    </>
  )
}
