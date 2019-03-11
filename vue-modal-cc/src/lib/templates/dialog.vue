<template>
    <section class="modal--container" :style="{ opacity: visible ? 1 : 0 }">
        <div class="modal--main" >
            <p class="msg-area">{{message}}</p>
            <div class="btn-area">
                <button class="btn" @click="_cancel()">取消</button>
                <button class="btn" @click="_confirm()">确认</button>
            </div>
        </div>
    </section>
</template>

<script>
	export default {
		name: "Dialog",
		data() {
			return {
				visible: false,
				message: "hello world"
			}
		},
        methods: {
			_confirm() {
				this.visible = false;
				setTimeout(() => {
					this.confirm && this.confirm();
					document.body.removeChild(this._self)
                }, 300);

            },
            _cancel() {
	            this.visible = false;
	            setTimeout(() => {
		            this.cancel && this.cancel();
		            document.body.removeChild(this._self)
	            }, 300);
            }
        }
	}
</script>

<style lang="scss" scoped>
    .modal--fade--in {
        animation: fade--in 0.3s ease-in;
    }
    .modal--fade--out {
        animation: fade--out 0.3s ease-in;
    }
    @keyframes fade--in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade--out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    .modal--container {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.6);
        transition: all .3s ease-out;
        opacity: 1;
        .modal--main {
            background: #fff;
            min-height: 100px;
            position: relative;
            width: 80%;
            height: auto;
            max-width: 400px;
            padding: 10px 20px;
            border-radius: 8px;
            overflow: hidden;
            .msg-area {
                width: 100%;
                text-align: center;
                font-size: 16px;
            }
            .btn-area {
                font-size: 0;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                .btn {
                    display: inline-block;
                    background: #fff;
                    width: 50%;
                    border-top: 1px solid #b3b3b3;
                    font-size: 16px;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    outline: none;
                    color: #666;
                    &:first-child {
                        border-right: 1px solid #b3b3b3;
                    }
                }

            }
        }
    }

</style>