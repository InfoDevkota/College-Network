<template>
    <q-page padding>
        <div class="row justify-center"><div class="col-12 col-md-6">
            <q-tabs
                dense
                align="left"
                inline-label
                class="text-white shadow-1"
                style="background: rgba(0, 0, 0, 0) linear-gradient(50deg, rgb(0, 188, 212), rgb(0, 150, 136), rgb(103, 58, 183)) repeat scroll 0% 0%;"
                shrink
                stretch
            >
                <q-route-tab icon="post_add" :to="{name: 'feed-posts'}" label="Posts" exact />
                <q-route-tab icon="note" label="Notes" :to="{name: 'feed-notes'}" exact />
            </q-tabs>
            <q-separator />
            <router-view></router-view>
            </div>
        </div>
    </q-page>
</template>