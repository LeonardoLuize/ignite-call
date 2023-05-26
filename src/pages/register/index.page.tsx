import React, { useEffect } from "react"
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react"
import { ArrowRight } from "phosphor-react"
import { Container, Form, FormError, Header } from "./styles"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"

const RegisterSchema = z.object({
    username: z
        .string()
        .min(3, { message: "O nome de usuário deve ter mais de 3 caracteres" })
        .regex(/^([a-z\\-]+)$/i, {
            message: "O nome de usuário deve ter apenas letras ou hifens",
        })
        .transform((value) => value.toLowerCase()),
    name: z
        .string()
        .min(3, { message: "O nome precisa ter pelo menos 3 letras" }),
})

type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema),
    })

    const router = useRouter()

    useEffect(() => {
        if(router.query.username){
            setValue("username", String(router.query.username))
        }
    }, [router.query?.username, setValue])

    async function handleRegister(data: RegisterSchema) {}

    return (
        <Container>
            <Header>
                <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
                <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm"> Nome de usuário</Text>
                    <TextInput
                        prefix="ignite.com/"
                        placeholder="seu-usuario"
                        {...register("username")}
                    />
                    {errors.username && (
                        <FormError size="sm">{errors.username.message}</FormError>
                    )}
                </label>

                <label>
                    <Text size="sm"> Nome completo</Text>
                    <TextInput placeholder="Seu nome" {...register("name")} />
                    {errors.name && (
                        <FormError size="sm">{errors.name.message}</FormError>
                    )}
                </label>

                <Button type="submit">
          Próximo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}
