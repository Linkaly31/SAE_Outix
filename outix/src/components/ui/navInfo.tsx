import Breadcrumbs from "./breadcrumbs"

function NavInfo() {
  return (
    <>
      <Breadcrumbs items={[
        { label: "Connexion", url: "/login" },
        { label: "Test", url: "/test" }
      ]} />
    </>
  )
}

export { NavInfo }
