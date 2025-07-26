function CriaJogo() {
    this.palpite = document.querySelector('#palpite');
    this.tentativas = 1;
    this.vitorias = 0;
    this.select = document.querySelector('#nivel');

    this.textTentativas = document.querySelector('#tentativas');
    this.textMensagem = document.querySelector('#mensagem');
    this.textVitorias = document.querySelector('#vitorias');

    this.jogar = () => {
        this.niveis();
        this.tentar();
    }

    this.tentar = () => {
        const btnTentar = document.querySelector('#btnTentar');

        btnTentar.addEventListener('click', () => {

            if (Number(this.palpite.value) < this.numeroSecreto) {
                this.textTentativas.innerHTML = `Tentativas: ${this.tentativas}`;
                this.tentativas++;
                return this.textMensagem.innerHTML = 'Palpite menor que o número!';
            }

            if (Number(this.palpite.value) > this.numeroSecreto) {
                this.textTentativas.innerHTML = `Tentativas: ${this.tentativas}`;
                this.tentativas++;
                return this.textMensagem.innerHTML = 'Palpite maior que o número!';
            }

            if (this.jogoVencido) return;
            if (Number(this.palpite.value) === this.numeroSecreto) {
                this.jogoVencido = true;
                this.vitorias++;
                this.textTentativas.innerHTML = `Tentativas: ${this.tentativas}`;
                this.textVitorias.innerHTML = `Acertos: ${this.vitorias}`;
                return this.textMensagem.innerHTML = 'Parabéns, Você acertou! 🎉';
            }

            if (this.valorSelecionado !== 'inicial') return;
        })
    }

    this.niveis = () => {
        const nivel = document.querySelector('#nivel');
        nivel.addEventListener('change', (e) => {
            const valorSelecionado = e.target.value;

            switch (valorSelecionado) {
                case 'facil':
                    this.numeroSecreto = this.gerarNumeros(1, 10);
                    break
                case 'medio':
                    this.numeroSecreto = this.gerarNumeros(1, 50);
                    break
                case 'dificil':
                    this.numeroSecreto = this.gerarNumeros(1, 100);
                    break
            }
        })
    }

    this.gerarNumeros = (min, max) => {
        this.numeroSecreto = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.numeroSecreto;
    }
    const btnReiniciar = document.querySelector('#btnReiniciar');
    btnReiniciar.addEventListener('click', () => {
        this.valorSelecionado = 'inicial';
        this.tentativas = 0;
        this.jogoVencido = false;

        if (this.valorSelecionado === 'inicial') {
            this.textMensagem.innerHTML = 'Selecione outro nivel!';
            this.textTentativas.innerHTML = '';
            btnTentar.disable = true;
        }
        this.gerarNumeros();
    })
}

const jogo = new CriaJogo();
jogo.jogar();