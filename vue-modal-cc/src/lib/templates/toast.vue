<template>
    <section class="modal--container">
        <div class="modal--main"
             :class="[ visible ? 'modal--fade--in' : 'modal--fade--out']"
             :style="{ transitionDuration: animation.transitionDuration }">
            <span>{{message}}</span>
        </div>
    </section>
</template>

<script>
	export default {
		name: "Toast",
		data() {
			return {
				visible: false,
				message: "hello world",
				animation: {
					transitionDuration: '0.3s'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
        .modal--main {
            background: rgba(0, 0, 0, 0.4);
            color: #fff;
            padding: 10px 20px;
            line-height: 20px;
            font-size: 14px;
            text-align: center;
            border-radius: 8px;
            animation-timing-function: ease-out;
            transition-property: all;
            transition-timing-function: ease-in-out;
            opacity: 0;
            transform: scale(0.7);
        }
    }

    .modal--fade--in {
        opacity: 1 !important;
        transform: scale(1) !important;;

    }
    .modal--fade--out {
        opacity: 0;
        transform: scale(0.7);
    }
    @keyframes fade--in {
        from {
            opacity: 0;
            transform: scale(0.7);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    @keyframes fade--out {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.7);
        }
    }
</style>