<template>
    <q-page padding :style="{display: flex}">
        <q-card class="bg-white text-black fit" >
                <q-card-section style="padding: 0">
                </q-card-section>
        <q-card-section  class="scroll">
    <div >
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="[
          'doing fine, how r you?',
          'I just feel like typing a really, really, REALY long message to annoy you...'
        ]"
        size="6"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['Did it work?']"
        stamp="1 minutes ago"
        size="8"
        text-color="white"
        bg-color="primary"
      />
    </div>

        </q-card-section>
            <q-card-section style="padding: 0">
                       <q-input
      v-model="text"
      filled
      autogrow
      standout
      dense
    >
    <template v-slot:append>
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>
    </q-input>
            </q-card-section>
      </q-card>
    </q-page>
</template>
