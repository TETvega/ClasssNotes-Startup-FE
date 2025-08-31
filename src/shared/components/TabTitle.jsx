import { Helmet } from "react-helmet"

export const TabTitle = ({title}) => {
  return (
    <Helmet>
    <title>{title}</title>
  </Helmet>
  )
}