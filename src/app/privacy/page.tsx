'use client';

import { FadeIn } from '@/components/ui/AnimatedComponents';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Last updated: April 26, 2024
        </p>
      </div>

      <div className="prose prose-indigo max-w-none">
        <FadeIn>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              At CareerPathFinder, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            <p className="text-gray-600">
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We may collect information about you in a variety of ways. The information we may collect via the Service includes:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Data</h3>
            <p className="text-gray-600 mb-4">
              Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Service.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Derivative Data</h3>
            <p className="text-gray-600 mb-4">
              Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial Data</h3>
            <p className="text-gray-600 mb-4">
              Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data From Social Networks</h3>
            <p className="text-gray-600 mb-4">
              User information from social networking sites, such as Facebook, Google+, Instagram, LinkedIn, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Device Data</h3>
            <p className="text-gray-600 mb-4">
              Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Service from a mobile device.
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Your Information</h2>
            <p className="text-gray-600 mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
              <li>Create and manage your account.</li>
              <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
              <li>Create and manage your account.</li>
              <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the Service to you.</li>
              <li>Email you regarding your account or order.</li>
              <li>Enable user-to-user communications.</li>
              <li>Generate a personal profile about you to make future visits to the Service more personalized.</li>
              <li>Increase the efficiency and operation of the Service.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
              <li>Notify you of updates to the Service.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
              <li>Perform other business activities as needed.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
              <li>Process payments and refunds.</li>
              <li>Request feedback and contact you about your use of the Service.</li>
              <li>Resolve disputes and troubleshoot problems.</li>
              <li>Respond to product and customer service requests.</li>
              <li>Send you a newsletter.</li>
            </ul>
          </section>
        </FadeIn>

        <FadeIn delay={0.3}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclosure of Your Information</h2>
            <p className="text-gray-600 mb-4">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">By Law or to Protect Rights</h3>
            <p className="text-gray-600 mb-4">
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Third-Party Service Providers</h3>
            <p className="text-gray-600 mb-4">
              We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Communications</h3>
            <p className="text-gray-600 mb-4">
              With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactions with Other Users</h3>
            <p className="text-gray-600 mb-4">
              If you interact with other users of the Service, those users may see your name, profile photo, and descriptions of your activity.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Online Postings</h3>
            <p className="text-gray-600 mb-4">
              When you post comments, contributions or other content to the Service, your posts may be viewed by all users and may be publicly distributed outside the Service in perpetuity.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Transfers</h3>
            <p className="text-gray-600 mb-4">
              If we or our subsidiaries are involved in a merger, acquisition, or asset sale, your information may be transferred.
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.4}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Security of Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.5}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights Regarding Your Information</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Information</h3>
            <p className="text-gray-600 mb-4">
              You may at any time review or change the information in your account or terminate your account by:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
              <li>Logging into your account settings and updating your account</li>
              <li>Contacting us using the contact information provided below</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Emails and Communications</h3>
            <p className="text-gray-600 mb-4">
              If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
              <li>Noting your preferences at the time you register your account with the Service</li>
              <li>Logging into your account settings and updating your preferences</li>
              <li>Contacting us using the contact information provided below</li>
            </ul>
          </section>
        </FadeIn>

        <FadeIn delay={0.6}>
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-600">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600 font-medium mt-4">
              CareerPathFinder<br />
              Email: naushadxia@gmail.com
            </p>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
