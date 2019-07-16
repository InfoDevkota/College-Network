<template>
  <q-page padding>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        >
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-xs-12">
            <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-xs-12 col-md-6">
                    <q-card class="my-card">
                        <q-item>
                            <q-item-section avatar>
                            <q-avatar>
                                <q-icon name="fas fa-university" />
                            </q-avatar>
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>Current Affiliation</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator/>
                            <div class="row q-pa-md">
                                <div class="col-xs-12">
                                    <q-select
                                        filled
                                        v-model="university"
                                        :options="options.university"
                                        label="Your University *"
                                        hint="University is required"
                                        emit-value
                                        map-options
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    />

                                    <q-select
                                        filled
                                        v-model="department"
                                        :options="options.department"
                                        label="Your Department *"
                                        hint="Department is required"
                                        emit-value
                                        map-options
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    />

                                    <q-select
                                        filled
                                        v-model="graduation_on"
                                        :options="options.graduation_on"
                                        label="Graduation On *"
                                        hint="Graduation On is required"
                                        emit-value
                                        map-options
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    />
                                </div>
                            </div>
                    </q-card>
                </div>
                 <div class="col-xs-12 col-md-6">
                    <q-card class="my-card">
                        <q-item>
                            <q-item-section avatar>
                            <q-avatar>
                                <q-icon name="fas fa-university" />
                            </q-avatar>
                            </q-item-section>

                            <q-item-section>
                            <q-item-label>About</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator/>
                            <div class="row q-pa-md">
                                <div class="col-xs-12">
                                    <q-date v-model="born_on" />
                                    <q-select
                                        filled
                                        v-model="university"
                                        :options="options.university"
                                        label="Your University *"
                                        hint="University is required"
                                        emit-value
                                        map-options
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    />

                                    <q-select
                                        filled
                                        v-model="department"
                                        :options="options.department"
                                        label="Your Department *"
                                        hint="Department is required"
                                        emit-value
                                        map-options
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    />

                                    <q-select
                                        filled
                                        v-model="graduation_on"
                                        :options="options.graduation_on"
                                        label="Graduation On *"
                                        hint="Graduation On is required"
                                        emit-value
                                        map-options
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                                    />
                                </div>
                            </div>
                    </q-card>
                </div>
            </div>
      </div>
      <div class="col-xs-12">
          <q-card>
                <q-toggle v-model="accept" label="I accept the license and terms" />

                    <div>
                        <q-btn label="Submit" type="submit" color="primary"/>
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                    </div>
            </q-card>
      </div>
    </div>
      </q-form>
  </q-page>
</template>
<script>
export default {
  name: 'profile-update',
  props: ['id'],
  data () {
    return {
      university: '',
      department: '',
      graduation_on: '',
      born_on: '',
      options: {
        university: [ {
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        },
        {
          label: 'Twitter',
          value: 'twt'
        },
        {
          label: 'Apple',
          value: 'app'
        },
        {
          label: 'Oracle',
          value: 'ora',
          disable: true
        }],
        department: [ {
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        },
        {
          label: 'Twitter',
          value: 'twt'
        },
        {
          label: 'Apple',
          value: 'app'
        },
        {
          label: 'Oracle',
          value: 'ora',
          disable: true
        }],
        graduation_on: [ {
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        },
        {
          label: 'Twitter',
          value: 'twt'
        },
        {
          label: 'Apple',
          value: 'app'
        },
        {
          label: 'Oracle',
          value: 'ora',
          disable: true
        }]
      }
    }
  }
}
</script>
