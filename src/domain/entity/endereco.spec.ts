import EnderecoEntity from "./endereco";

describe("test entity address", () => {
    test("create address", async () => {
        const sut = new EnderecoEntity({
            cep: "12345678",
            logradouro: "",
            pessoa_id: 1,
            tipo_endereco_id: 1,
            bairro_id: 5,
            complemento: "teste",
            numero: "7273147hs",
            tipo_logradouro_id: 1
        });
        console.log(sut);
        expect(sut.props.cep).toBe("12345678");
    });
});
