import { Box, styled } from "@ignite-ui/react"

export const ConnectBox = styled(Box, {
    marginTop: "$6",
    display: "flex",
    flexDirection: "column",
})

export const ConnectItem = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    border: "1px solid $gray600",
    padding: "$4 $6",
    borderRadius: "$md",

    marginBottom: "$2",
})