import React from "react"
import { Button, Text, TextInput } from "@ignite-ui/react"
import { ArrowRight } from "phosphor-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormAnnotation } from "./styles"
import { useRouter } from "next/router"

const PreRegisterSchema = z.object({
    username: z
        .string()
        .min(3, { message: "O nome de usuário deve ter mais de 3 caracteres" })
        .regex(/^([a-z\\-]+)$/i, {
            message: "O nome de usuário deve ter apenas letras ou hifens",
        })
        .transform((value) => value.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof PreRegisterSchema>;

export default function ClaimUsernameForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(PreRegisterSchema),
    })

    const router = useRouter()

    async function handlePreRegister(data: ClaimUsernameFormData) {
        const {username} = data

        await router.push(`/register?username=${username}`)
    }

    return (
        <>
            <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
                <TextInput
                    size="sm"
                    prefix="ignite.com/"
                    placeholder="seu-usuário"
                    {...register("username")}
                />
                <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar usuário
                    <ArrowRight />
                </Button>
            </Form>
            <FormAnnotation>
                <Text size="sm">
                    {errors.username
                        ? errors.username.message
                        : "Digite o nome do usuário desejado"}
                </Text>
            </FormAnnotation>
        </>
    )
}
