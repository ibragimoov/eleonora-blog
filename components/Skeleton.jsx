import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={460}
        viewBox="0 0 400 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="42" cy="427" r="15" />
        <rect x="69" y="414" rx="2" ry="2" width="140" height="10" />
        <rect x="69" y="430" rx="2" ry="2" width="140" height="10" />
        <rect x="24" y="24" rx="20" ry="20" width="364" height="420" />
    </ContentLoader>
)

export default Skeleton
