import React from "react"
import { Heading, Text } from "@ignite-ui/react"
import { Container, Hero, Preview } from "./styles"

import PreviewImg from "@/assets/app-preview.png"
import Image from "next/image"
import ClaimUsernameForm from "./components/ClaimUsernameForm"

export default function Home() {
    return (
        <Container>
            <Hero>
                <Heading as="h1" size="4xl">
          Agendamento descomplicado
                </Heading>
                <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
                </Text>

                <ClaimUsernameForm />
            </Hero>
            <Preview>
                <Image
                    src={PreviewImg}
                    height={400}
                    quality={100}
                    priority
                    alt="Preview do app"
                />
            </Preview>
        </Container>
    )
}
