import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="w-fit h-fit rounded-sm overflow-hidden border-2 border-border mx-auto mb-6">
          <Image src="/my.jpg" alt="양도승 프로필" width={160} height={160} className="object-cover w-full h-full" />
        </div>
        <h1 className="text-4xl font-bold mb-2">양도승</h1>
        <p className="text-xl text-muted-foreground mb-4">Software Engineer</p>
        <p className="text-muted-foreground">doseung.dev@gmail.com</p>
      </div>

      <Separator className="my-12" />

      {/* Work Experience */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">Work Experience</h2>

        {/* 언컷젬스컴퍼니 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-semibold">언컷젬스컴퍼니</h3>
            <div className="flex flex-col sm:items-end">
              <p className="font-medium">Software Engineer</p>
              <p className="text-sm text-muted-foreground">2024.11 - 재직중</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* 페이브릴 서비스 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">페이브릴 서비스</h4>
              <p className="text-sm text-muted-foreground mb-4">명품 주얼리 전문 거래 커머스 플랫폼</p>
              <div className="mb-4">
                <h5 className="font-medium text-sm mb-2">주요 성과</h5>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 페이브릴 서비스 풀스택 개발, 배포, 서비스 출시 및 운영</li>
                  <li>• 서비스의 설계부터 구현, 운영까지 담당하며 사용자 경험을 개선</li>
                  <li>• 데이터 기반 A/B 테스트 및 마케팅 효율 개선</li>
                  <li>• openAI 기반 개인화 상품 추천 시스템</li>
                  <li>• (데이터 크롤링) 브랜드 및 컬렉션 별 정가 시세 및 분석하고 제공하는 코어 기능 개발</li>
                  <li>
                    • 채널톡 sdk, 회원정보 연동으로 분리되어있는 상담 통합 일원화 및 자동화로 상담 효율 개선 및 ALF 세팅
                  </li>
                  <li>• 상담 통합 일원화 및 자동화</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">기술 스택</h5>
                <div className="flex flex-wrap gap-1">
                  {[
                    'React',
                    'Next14',
                    'TypeScript',
                    'Nest',
                    'Supabase',
                    'ReactNative',
                    'Python',
                    'Zod',
                    'Vitest',
                    'GTM',
                    'Zustand',
                    'Cloudflare Workers',
                    'Tailwind',
                    'Git',
                    'Retool',
                    'Vercel',
                    'Google Analytics',
                    'Linear',
                    'Jira',
                    'Mixpanel',
                    'Firebase',
                    'AppsFlyer',
                    'Deeplink',
                  ].map(tech => (
                    <span key={tech} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 아뜰리에 백오피스 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">아뜰리에 백오피스</h4>
              <p className="text-sm text-muted-foreground mb-4">내부 운영팀 효율성 향상을 위한 관리 도구</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Retool → 자체 백오피스로 마이그레이션</li>
                <li>• 액션 뎁스 통합 및 데이터 연동으로 휴먼 에러 방지</li>
                <li>• 운영업무 효율화 및 자동화</li>
                <li>• App push, Alimtalk 등 CRM 연동 및 대시보드 구축</li>
              </ul>
            </div>

            {/* 앱 인프라 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">앱 인프라 통합 개선</h4>
              <p className="text-sm text-muted-foreground mb-4">iOS/Android 앱 인프라 구축 및 개선</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• iOS/Android 푸시 알림 인프라 구축(Foreground/Background 처리, 배지 설정·리셋)</li>
                  <li>• 앱 링크/딥링크 체계화(Android App Links+커스텀 스킴)</li>
                  <li>• 이미지 선택·미리보기 파이프라인(멀티 픽, 리사이즈, 이미지 뷰 연동)</li>
                  <li>• 데이터/마케팅 연계(AppsFlyer·Firebase Analytics)</li>
                </ul>
              </div>
            </div>

            {/* 결제 서비스 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">결제 서비스 개편</h4>
              <p className="text-sm text-muted-foreground mb-4">레거시 결제 시스템을 차등 할인 구조로 리디자인</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Toss v1 → 결제 수단 별 차등 할인 구조로 리디자인</li>
                <li>• 단건/분할 공통 금액 엔진 단일화</li>
                <li>• 페이브릴 결제 시스템에 맞는 sale_price 우선 로직·주문/회차 금액 스키마 분리 정합성 확보</li>
                <li>• 회차 금액 보정, 진행상태 복원, 재시도, 멱등 처리</li>
                <li>• 결제 웹훅 고도화 및 실패 롤백 자동화</li>
                <li>• Slack 알림 및 교차검증 자동화 구축</li>
              </ul>
            </div>

            {/* 시세 프로젝트 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">중고 명품 적정 시세 프로젝트</h4>
              <p className="text-sm text-muted-foreground mb-4">시세 탭 UI/UX 개발 및 검색 알고리즘 구현</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 사용자 개인화 데이터 기반 모델 추천 로직 구현</li>
                <li>• 키워드 매칭 개선 (오타 허용, 부분 일치)</li>
                <li>• 실시간 검색어 추천 검색 알고리즘 개발</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 와디즈 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-semibold">와디즈</h3>
            <div className="flex flex-col sm:items-end">
              <p className="font-medium">CX Solution Engineer</p>
              <p className="text-sm text-muted-foreground">2022.05 ~ 2024.11</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* 도움말센터 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">와디즈 도움말센터</h4>
              <p className="text-sm text-muted-foreground mb-4">문의 등록, 상담 예약, 챗봇 상담 및 상담센터 개발</p>
              <div className="mb-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 와디즈 도움말센터(고객센터 공식 홈페이지) 개발</li>
                  <li>• 공통 모듈 개발 및 서비스 연동</li>
                  <li>• Zendesk & Slack 연동 및 모듈화</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-2">기술 스택</h5>
                <div className="flex flex-wrap gap-1">
                  {[
                    'React',
                    'Next13',
                    'TypeScript',
                    'Zod',
                    'styled-components',
                    'Jira',
                    'Zendesk API',
                    'Slack API',
                    'Python',
                    'AWS Lambda',
                    'jest',
                  ].map(tech => (
                    <span key={tech} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 상담 솔루션 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">상담 솔루션 일원화</h4>
              <p className="text-sm text-muted-foreground mb-4">분산된 상담 데이터를 옴니채널로 일원화</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 6개 상담 채널 → 1개 상담 솔루션 일원화 구축</li>
                <li>• Zendesk API 활용 긴급 이슈 관리 자동화</li>
                <li>• Self-service UI 및 챗봇 트리 개발</li>
                <li>• BPO 프로세스 개선 및 자동화</li>
                <li>• SEO 최적화 및 웹사이트 최적화</li>
              </ul>
            </div>

            {/* 광고 도움말센터 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">광고 도움말센터</h4>
              <p className="text-sm text-muted-foreground mb-4">광고 컨설팅 및 광고 도움말센터 구축</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• AI 상담 SDK 연동 및 딥러닝 적용</li>
                <li>• 광고센터 공통 페이지 모듈화</li>
                <li>• 광고 컨설팅 시스템 구축</li>
              </ul>
            </div>

            {/* Letz 펀딩 서비스 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">Letz 펀딩 서비스</h4>
              <p className="text-sm text-muted-foreground mb-4">간편 후원 펀딩 서비스 프론트엔드 개발</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 웹앱 메일 템플릿 자동화</li>
                  <li>• 서버리스 인프라 구축</li>
                  <li>• 모바일 웹 대응 및 AOS 미지원 대응</li>
                </ul>
              </div>
            </div>

            {/* 심사 대시보드 */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="font-semibold mb-2 text-lg">심사 현황 대시보드</h4>
              <p className="text-sm text-muted-foreground mb-4">운영팀 실시간 업무 모니터링 및 심사 진행 상황 시각화</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 실시간 업무 모니터링 시스템</li>
                <li>• 수기 현황 파악 프로세스 자동화</li>
                <li>• 심사 진행 상황 시각화</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />
    </div>
  );
}
